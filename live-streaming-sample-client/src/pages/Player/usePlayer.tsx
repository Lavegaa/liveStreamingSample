import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const usePlayer = function () {
  const [url, setUrl] = useState<string>('');
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
