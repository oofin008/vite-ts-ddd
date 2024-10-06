import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from '@firebase/storage';
import { RcFile } from 'antd/lib/upload';

const { Dragger } = Upload;
const { storage } = firebaseApp;

const UploadForm: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

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
    // setUploading(true);

    try {
      const downloadURL = await uploadLargeFileByResumable(file, (percent) => {
        onProgress({ percent });
      });
      onSuccess(downloadURL, file);
      console.log('File uploaded successfully:', downloadURL);
      message.success(`${file.name} file uploaded successfully`);
      // onUploadSuccess(downloadURL);
    } catch (error) {
      onError({ error });
      console.log('Error uploading file:', error);
      message.error(`${file.name} file upload failed.`);
    } finally {
      // setUploading(false);
    }
    // for(let i = 0; i < fileList.length; i++) {
    //   const file = fileList[i];
    //   const storageRef = ref(storage, 'images/' + file.name);
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!', snapshot);
    //   });
    // }
  }
  const uploadProps: UploadProps = {
    fileList,
    beforeUpload: (file: UploadFile) => {
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

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

export default UploadForm;