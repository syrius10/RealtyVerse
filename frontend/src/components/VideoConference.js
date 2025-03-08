import React, { useEffect, useRef, useState } from 'react';

const VideoConference = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE candidate:', event.candidate);
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    setPeerConnection(pc);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      });

    return () => {
      pc.close();
    };
  }, []);

  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    setOffer(offer);
    console.log('Offer created:', offer);
  };

  const createAnswer = async (offer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    console.log('Answer created:', answer);
  };

  return (
    <div>
      <h2>Video Conference</h2>
      <div>
        <video ref={localVideoRef} autoPlay playsInline />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <button onClick={createOffer}>Create Offer</button>
      <button onClick={() => createAnswer(offer)}>Create Answer</button>
    </div>
  );
};

export default VideoConference;