import React, { useState } from 'react';
import { Card, Button } from 'antd';

interface VideoPreviewProps {
  url: string;
  title?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ url, title = 'Video Preview' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('video-player') as HTMLVideoElement;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Card
      title={title}
      extra={
        <Button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      }
      style={{ width: '100%', maxWidth: '600px' }}
    >
      <video
        id="video-player"
        src={url}
        style={{ width: '100%' }}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </Card>
  );
};

export default VideoPreview;