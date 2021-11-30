import React from 'react';
import ReactPlayer from 'react-player';

import Chatting from '@components/Chatting';
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
      <div>
        {/* <Chatting /> */}
        <video preload="auto" controls style={{ width: '400px', height: '400px' }}>
          <source src="blob:http://localhost:3000/f0c47cff-03f0-4e12-bc64-b059c6fbb07a" type="application/x-mpegURL" />
        </video>
      </div>
    </div>
  );
};

export default Player;
