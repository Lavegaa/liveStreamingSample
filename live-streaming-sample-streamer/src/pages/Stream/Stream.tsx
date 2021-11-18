import React from 'react';
import useStream from './useStream';

const Stream = function () {
  const { url, viewRef, message, handleUrl, handleConnect, handleCameraReady, handleStart } = useStream();
  return (
    <div>
      <h1>URL: {url}</h1>
      <input value={url} onChange={handleUrl} />
      <h1>Message: {message}</h1>
      <button type="button" onClick={() => handleConnect()}>
        connect
      </button>
      <button type="button" onClick={() => handleCameraReady()}>
        Camera Ready
      </button>
      <button type="button" onClick={() => handleStart()}>
        Start
      </button>
      <video ref={viewRef} playsInline muted autoPlay width={1920} height={1080} />
    </div>
  );
};

export default Stream;
