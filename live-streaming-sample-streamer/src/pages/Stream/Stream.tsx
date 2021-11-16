import React from 'react';
import useStream from './useStream';

const Stream = function () {
  const { url, viewRef, handleUrl, handleConnect, handleCameraReady, handleStart } = useStream();
  return (
    <div>
      <h1>URL: {url}</h1>
      <input value={url} onChange={handleUrl} />
      <button type="button" onClick={() => handleConnect(true)}>
        connect
      </button>
      <button type="button" onClick={() => handleCameraReady()}>
        Camera Ready
      </button>
      <button type="button" onClick={() => handleStart()}>
        Start
      </button>
      <video ref={viewRef} playsInline muted autoPlay width={400} height={400} />
    </div>
  );
};

export default Stream;
