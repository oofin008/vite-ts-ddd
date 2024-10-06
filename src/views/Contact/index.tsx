import React from 'react'
import UploadForm from '@/components/ui/UploadForm'
import VideoTable from '@/components/ui/VideoTable'
import VideoUploader from '@/components/ui/ClaudeUpload'
import VideoPreview from '@/components/ui/ClaudePreview'

const Contact = () => {
  const [downloadUrl, setDownloadUrl] = React.useState<string>("");
  return (
    <>
      <h1 className='animate__animated animate__bounce'>Contact</h1>
      <UploadForm />
      {/* <VideoUploader onUploadSuccess={(url) => {setDownloadUrl(url)}}/> */}
      {/* <VideoTable files={[]}/> */}
      <VideoPreview url={downloadUrl} />
    </>
  )
}

export default Contact