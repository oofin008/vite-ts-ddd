import React from 'react';
import { firebaseApp } from '@/core/data/auth/firebaseApp';
import { ref, listAll, getDownloadURL } from '@firebase/storage';

interface File {
  id: number;
  name: string;
  size: number;
  uploadedAt: Date;
}

interface VideoTableProps {
  files: File[];
}
const { storage } = firebaseApp;

const VideoTable: React.FC<VideoTableProps> = ({ files }) => {
  const listFiles: File[] = []; // Initialize an empty array to store the list of files

  // Function to fetch the list of files from Firebase storage
  const fetchFiles = () => {
    const listRef = ref(storage, 'images');

    listAll(listRef)
      .then((res) => {
        console.log('fetch files', res);
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          console.log('itemRef', itemRef);
          console.log(itemRef.fullPath);
          getDownloadURL(itemRef).then((url) => {
            console.log('url', url);
          });
        });
      }).catch((error) => {
        console.log('fetch files error', error);
      });
  };

  // Call the fetchFiles function to fetch the files when the component mounts
  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Size</th>
          <th>Uploaded At</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id}>
            <td>{file.id}</td>
            <td>{file.name}</td>
            <td>{file.size}</td>
            <td>{file.uploadedAt.toISOString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VideoTable;