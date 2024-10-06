import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { RcFile } from 'antd/lib/upload';

const { Dragger } = Upload;
const { storage } = firebaseApp;

interface VideoUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {

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
      const downloadURL = await uploadLargeFileByResumable(file, (percent) => {
        onProgress({ percent });
      });
      onSuccess(downloadURL, file);
      console.log('File uploaded successfully:', downloadURL);
      message.success(`${file.name} file uploaded successfully`);
      onUploadSuccess(downloadURL);
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