import React from 'react';
import ReactPlayer from 'react-player';

import usePlayer from './usePlayer';

const Player = function () {
  const { url, handleUrl, isPlay, handlePlay } = usePlayer();

  return (
    <div>
      <h1>URL: {url}</h1>
      <input value={url} onChange={handleUrl} />
      <button type="button" onClick={() => handlePlay(true)}>
        play
      </button>
      <button type="button" onClick={() => handlePlay(false)}>
        stop
      </button>
      <ReactPlayer url={url} playing={isPlay} controls width="100%" height="100%" />
    </div>
  );
};

export default Player;
