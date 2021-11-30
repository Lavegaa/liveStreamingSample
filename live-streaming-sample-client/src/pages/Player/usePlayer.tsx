import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const usePlayer = function () {
  const [url, setUrl] = useState<string>('http://10.20.125.65:8080/hls/test.m3u8');
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handlePlay = (play: boolean) => {
    setIsPlay(play);
  };

  return {
    url,
    setUrl,
    handleUrl,
    isPlay,
    handlePlay,
  };
};

export default usePlayer;
