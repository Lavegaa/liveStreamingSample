import React, { useEffect, useState, useCallback, useRef } from 'react';
import socketIOClient from 'socket.io-client';

interface ConstraintsType {
  audio: {
    sampleRate: number;
    echoCancellation: boolean;
  };
  video: {
    width: {
      max: number;
      min: number;
      ideal: number;
    };
    height: {
      max: number;
      min: number;
      ideal: number;
    };
    frameRate: {
      ideal: number;
    };
  };
}

interface mobileType {
  audio: boolean;
  video: {
    facingMode: string;
  };
}

const useStream = function () {
  const [url, setUrl] = useState<string>('rtmp://10.100.120.51:1935/live/test');
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>();
  const [socket, setSocket] = useState<any>();
  const [message, setMessage] = useState<string>();
  const [constraints, setConstraints] = useState<ConstraintsType>({
    audio: { sampleRate: 22050, echoCancellation: true },
    video: {
      width: { min: 100, ideal: 240, max: 1920 },
      height: { min: 100, ideal: 240, max: 1080 },
      frameRate: { ideal: 15 },
    },
  });
  const [mobile, setMobile] = useState<mobileType>({ audio: true, video: { facingMode: 'user' } });
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (socket) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        socket.emit('config_rtmpDestination', url);
        socket.emit('start', 'start');
        setLocalStream(stream);
      });
      socket.on('fatal', (m: any) => {
        console.log('fatal socket error!!', m);
      });
      socket.on('message', (m: any) => {
        console.log('message:  ', m);
        setMessage(m);
      });
      socket.on('ffmpeg_stderr', function (m: any) {
        console.log('FFMPEG:'.concat(m));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.start(250);
      mediaRecorder.onstop = function (e) {
        console.log('stopped!');
        console.log(e);
      };

      mediaRecorder.onpause = function (e) {
        console.log('media recorder paused!!');
        console.log(e);
      };

      // mediaRecorder.onerror = function (event) {};

      mediaRecorder.ondataavailable = function (e) {
        if (message !== 'onAir') {
          setMessage('onAir');
        }
        socket.emit('binarystream', e.data);
      };
    }
  }, [mediaRecorder]);

  const handleStart = useCallback(() => {
    if (localStream) {
      setMediaRecorder(new MediaRecorder(localStream));
    }
  }, [localStream]);

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleConnect = useCallback(() => {
    const socketOptions = {
      secure: true,
      reconnection: true,
      reconnectionDelay: 1000,
      timeout: 15000,
      pingTimeout: 15000,
      pingInterval: 45000,
      query: { framespersecond: '15', audioBitrate: '22050' },
    };

    setSocket(socketIOClient('http://10.100.120.43:1437', socketOptions));
  }, []);

  const handleCameraReady = useCallback(() => {
    if (localStream && viewRef.current) {
      viewRef.current.srcObject = localStream;
    }
  }, [localStream, viewRef]);

  return {
    url,
    viewRef,
    message,
    handleUrl,
    handleConnect,
    handleCameraReady,
    handleStart,
  };
};

export default useStream;
