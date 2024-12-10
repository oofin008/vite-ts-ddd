import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { RcFile } from 'antd/lib/upload';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import axios from 'axios';

const { Dragger } = Upload;

interface VideoUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {

  const videoPath = 'users/';

  const uploadLargeVideoFile = async (
    file: RcFile,
    onProgress: (percent: number) => void
  ): Promise<void> => {
    const chunkSize = 10 * 1024 * 1024; // 10MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);

    let start = 0;
    const uploadUrl = await firebaseAdminImpl.getSignedUploadUrl(videoPath + file.name);
  
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const end = Math.min(start + chunkSize - 1, file.size-1);
      const chunk = file.slice(start, end + 1);
  
      try {
        const response = await axios.put(uploadUrl, chunk, {
          headers: {
            "Content-Type": "video/mp4",
            "Content-Range": `bytes ${start}-${end}/${file.size}`,
            "Content-Length": `${chunk.size || end - start + 1}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = ((start + progressEvent.loaded) / file.size) * 100;
            onProgress(progress);
          },
          validateStatus: (status) => {
            // Treat 308 as a valid status to continue
            return status === 200 || status === 308;
          },
        });
  
        // If the server responds with a 308 status, it means the upload is incomplete
        if (response.status === 308) {
          const range = response.headers['range'];
          if (range) {
            const bytesReceived = parseInt(range.split('-')[1], 10) + 1;
            start = bytesReceived; // Adjust start to resume from the correct position
            continue;
          }
        }

        // If the server responds with a 200 status, it means the upload is complete
        if(response.status === 200) {
          break;
        }
      } catch (error) {
        console.error(`Error uploading chunk ${chunkIndex + 1}:`, error);
        throw error;
      }
  
      start = end + 1; // Move to the next chunk
    }
  
  };  
  
  const handleUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    try {
      await uploadLargeVideoFile(file, (percent) => {
        onProgress({ percent });
      });
      const downloadURL = await firebaseAdminImpl.getDownloadUrl(videoPath + file.name);
      onSuccess(downloadURL, file);
      onUploadSuccess(downloadURL);
    } catch (error) {
      onError({ error });
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