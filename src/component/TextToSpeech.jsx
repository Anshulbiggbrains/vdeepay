import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text = "" }) => {
  //   console.log("text=>", text);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  console.log("utteranc=>", utterance);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    console.log("value set in utterance");

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    // if (isPaused) {
    //   synth.resume();
    // }

    synth.speak(utterance);
    console.log("handle play");

    // setUtterance(null);
    // setIsPaused(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  useEffect(() => {
    if (utterance) {
      console.log("inside utterance change useEffect if statement");
      document.getElementById("myButton").click();
    }
  }, [utterance]);

  return (
    <div>
      <button id="myButton" onClick={handlePlay}>
        {isPaused ? "Resume" : "Play"}
      </button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;
