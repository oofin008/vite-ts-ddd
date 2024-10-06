import React from 'react'
import VideoUploader from '@/components/ui/VideoUploader'
import VideoTable from '@/components/ui/VideoTable'
import VideoPreview from '@/components/ui/VideoPreview'
import { Space } from 'antd'

const Contact = () => {
  const [downloadUrl, setDownloadUrl] = React.useState<string>("");
  return (
    <Space direction='vertical' size='middle'>
      <h1 className='animate__animated animate__bounce'>Contact</h1>
      <VideoUploader onUploadSuccess={(url) => {setDownloadUrl(url)}}/>
      <VideoPreview url={downloadUrl} />
    </Space>
  )
}

export default Contact