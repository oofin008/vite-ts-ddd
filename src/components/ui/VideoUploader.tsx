import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { RcFile } from 'antd/lib/upload';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import axios from 'axios';

const { Dragger } = Upload;
const { storage } = firebaseApp;

interface VideoUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {
  const rcFileToBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a Base64 string
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the metadata prefix (e.g., "data:<mime-type>;base64,")
        const base64FileBuffer = base64String.split(",")[1];
        resolve(base64FileBuffer);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadViaFirebaseFunc = async (
    file: RcFile,
    onProgress: (percent: number) => void
  ): Promise<string> => {
    try {
      const fileBuffer = await rcFileToBase64(file);
      const response = await firebaseAdminImpl.testUpload(fileBuffer);
      console.log('upload result: ', response);
      return Promise.resolve("success");
    } catch (error: any) {
      throw error;
    }
  }

  const uploadLargeVideoFile = async (
    file: RcFile,
    onProgress: (percent: number) => void
  ): Promise<void> => {
    const chunkSize = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
  
    console.log(`Uploading ${file.name} in ${totalChunks} chunks...`);
  
    let start = 0;
    const uploadUrl = await firebaseAdminImpl.testSignUrl();
  
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const end = Math.min(start + chunkSize, file.size) - 1;
      const chunk = file.slice(start, end + 1);
  
      try {
        const response = await axios.put(uploadUrl, chunk, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Range": `bytes ${start}-${end}/${file.size}`,
          },
          onUploadProgress: (progressEvent) => {
            const chunkProgress = (progressEvent.loaded / (end - start + 1)) * 100;
            const overallProgress = ((chunkIndex + progressEvent.loaded / (end - start + 1)) / totalChunks) * 100;
            console.log(`Chunk Progress: ${chunkProgress.toFixed(2)}%`);
            onProgress(overallProgress);
          },
          validateStatus: (status) => {
            // Treat 308 as a valid status to continue
            return status === 200 || status === 308;
          },
        });
  
        if (response.status === 308) {
          const range = response.headers['range'];
          if (range) {
            const bytesReceived = parseInt(range.split('-')[1], 10) + 1;
            console.log(`Resuming upload from byte ${bytesReceived}.`);
            start = bytesReceived; // Adjust start to resume from the correct position
            continue;
          }
        }
  
        console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded successfully.`);
      } catch (error) {
        console.error(`Error uploading chunk ${chunkIndex + 1}:`, error);
        throw error;
      }
  
      start = end + 1; // Move to the next chunk
    }
  
    console.log("Upload completed successfully.");
  };  
  

  const uploadLargeFileByResumable = async (
    file: RcFile,
    onProgress: (percent: number) => void
  ): Promise<string> => {
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        console.log('File uploaded successfully');
      }
    );

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log('Options:', options);

    try {
      // const downloadURL = await uploadLargeFileByResumable(file, (percent) => {
      //   onProgress({ percent });
      // });
      // const downloadURL = await uploadViaFirebaseFunc(file, (percent) => {
      //   onProgress({ percent });
      // })
      // onSuccess(downloadURL, file);
      // console.log('File uploaded successfully:', downloadURL);
      // message.success(`${file.name} file uploaded successfully`);
      // onUploadSuccess(downloadURL);
      await uploadLargeVideoFile(file, (percent) => {
        onProgress({ percent });
      });
    } catch (error) {
      onError({ error });
      console.log('Error uploading file:', error);
      message.error(`${file.name} file upload failed.`);
    }
  }

  return (<>
    <Dragger
      customRequest={handleUpload}
      accept='video/*'
      maxCount={1}
      showUploadList={true}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  </>);
};

export default VideoUploader;