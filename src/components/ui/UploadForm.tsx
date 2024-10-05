import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { ref, uploadBytes, uploadBytesResumable } from '@firebase/storage';

const { Dragger } = Upload;
const { storage } = firebaseApp;

const UploadForm: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);
  const uploadToStorage = async () => {
    for(let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const storageRef = ref(storage, 'images/' + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
      
    }
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
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
    <Button type="primary" onClick={uploadToStorage}>Upload</Button>
  </>);
};

export default UploadForm;