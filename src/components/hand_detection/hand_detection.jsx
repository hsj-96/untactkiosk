import React, { useEffect, useRef } from 'react';
import styles from './hand_detection.module.css';
import { Hands } from '@mediapipe/hands';
import * as cam from "@mediapipe/camera_utils";
import Webcam from 'react-webcam';

const FINGER_INDEX = 8;
//const POINTER_COLOR = '#21BB1E';
const POINTER_SIZE = 20;
const POINTER_STROKE_WIDTH = 6;

const HandDetection = ({ setPointerPos }) => {
  const webcamRef = useRef();
  const canvasRef = useRef();

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    //canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks && results.multiHandedness) {
      const landmarks = results.multiHandLandmarks[0][FINGER_INDEX];
      const scale = 1.1;
      const x = landmarks.x * canvasElement.width;
      const y = landmarks.y * canvasElement.height * scale; 

      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgba(33, 187, 30, 0.8)';
      canvasCtx.arc(x, y, POINTER_SIZE, 0, 2*Math.PI);
      canvasCtx.fill();

      canvasCtx.strokeStyle = 'rgba(33, 187, 30, 0.5)';
      canvasCtx.arc(x, y, POINTER_SIZE+POINTER_STROKE_WIDTH, 0, 2*Math.PI);
      canvasCtx.lineWidth = POINTER_STROKE_WIDTH;
      canvasCtx.stroke();

      setPointerPos(x, y);
    }
    canvasCtx.restore();
  };

  useEffect(() => {
    console.log('HandDetection useEffect');

    canvasRef.current.width = document.documentElement.clientWidth;
    canvasRef.current.height = document.documentElement.clientHeight;

    const hands = new Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }});

    hands.setOptions({
      selfieMode: true,
      maxNumHands: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video });
        },
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
      camera.start();
    }
  });

  return (
    <>
      <Webcam ref={webcamRef} className={styles.webcam}></Webcam>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </>
  );
};

export default HandDetection;