import "./VideoChat.css";
import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../context/Socket";
import Peer from "simple-peer";
import styled from "styled-components";
import { Button } from "reactstrap";
import makeToast from "../../../components/misc/Toaster";

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
  border-radius: 5px;
  display: block;
  margin-bottom: 0.5rem;
`;

export default function VideoChat(props) {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const acceptDivRef = useRef();
  const callBtn = useRef();
  const endBtn = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on("onCallEnd", () => {
      makeToast("success", "The call has ended.")
      callBtn.current.children[0].innerText = "Call";
      setCallAccepted(false);
      setReceivingCall(false);
    });
  }, []);

  function callPeer() {
    console.log(callBtn.current.children[0]);
    callBtn.current.children[0].innerText = "Calling...";
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        room: props.room,
        signalData: data,
        from: props.userID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: caller, room: props.room });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    acceptDivRef.current.innerHTML = "";
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    // console.log("Ok:" + acceptDivRef.current.innerHTML)
    // acceptDivRef.current.innerHTML = "";
    console.log(endBtn.current);
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div ref={acceptDivRef}>
        <h1>Incoming Call...</h1>
        <Button color="success" onClick={acceptCall}>
          Accept
        </Button>
      </div>
    );
  }

  function endCall() {
    socket.emit("endCall", {
      room: props.room,
    });
  }

  return (
    <div>
      <div>
        {UserVideo}
        {PartnerVideo}
      </div>
      <div ref={callBtn}>
        {callAccepted ? null : (
          <Button color="primary" onClick={() => callPeer()}>
            Call
          </Button>
        )}
        {callAccepted && (
          <Button
            className="endBtn"
            onClick={() => endCall()}
            ref={endBtn}
            color="danger"
          >
            End
          </Button>
        )}
      </div>
      <div >{incomingCall}</div>
    </div>
  );
}