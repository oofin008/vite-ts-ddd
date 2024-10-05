import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { firebaseApp } from '@/core/data/auth/firebaseApp';

const { storage } = firebaseApp;
interface VideoUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);

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
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      customRequest={handleUpload}
      accept="video/*"
      maxCount={1}
      showUploadList={true}
    >
      <Button icon={<UploadOutlined />} loading={uploading}>
        Upload Video
      </Button>
    </Upload>
  );
};

export default VideoUploader;