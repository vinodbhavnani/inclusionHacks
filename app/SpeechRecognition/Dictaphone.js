import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Dictaphone = ({
  transcript,
  interimTranscript,
  finalTranscript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <button onClick={() => startListening()}>Start Listening</button>
      <button onClick={() => stopListening()}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <br />
      <span>{transcript}</span>
      <span>{interimTranscript}</span>
      <span>{finalTranscript}</span>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
const options = {
  autoStart: false,
  continuous: false,
}

export default SpeechRecognition(options)(Dictaphone);