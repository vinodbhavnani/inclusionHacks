import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechSynthesis from "./speechSynthesis";
import Button from "./button";

export default class Speech extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.onend = this.onend.bind(this);
    this.onerror = this.onerror.bind(this);
  }

  setSpeechSynthesis() {
    this.speechSynthesis = new SpeechSynthesis(this.props);
    this.speechSynthesis.onend(this.onend);
    this.speechSynthesis.onerror(this.onerror);
  }

  play() {
    this.setSpeechSynthesis();
    this.speechSynthesis.speak();
  }

  pause() {
    this.speechSynthesis.pause();
  }

  resume() {
    this.speechSynthesis.resume();
  }

  stop() {
    this.speechSynthesis.cancel();
  }

  onend() {
    this.stop();
    if (this.props.finish) {
      this.props.finish();
    }
  }

  onerror() {
    this.stop();
  }

  render() {
    if (this.props.disabled || !SpeechSynthesis.supported()) {
      return (
        <span className="rs-container">
          <span className="rs-text">
            {this.props.text}
          </span>
        </span>
      );
    }

    var play;
    var stop;
    var pause;
    var resume;

    if (this.props.textAsButton) {
      play = (
        <Button
          className="rs-play"
          onClick={this.play}
        >
          <span className="rs-text">
            {this.props.displayText || this.props.text}
          </span>
        </Button>
      );
    } else {
      play = (
        <Button
          className="rs-play"
          onClick={this.play}
          text="Play"
        />
      );
    }

    if (this.props.stop) {
      stop = (
        <Button
          className="rs-stop"
          onClick={this.stop}
          text="Stop"
        />
      );
    }

    if (this.props.pause) {
      pause = (
        <Button
          className="rs-pause"
          onClick={this.pause}
          text="Pause"
        />
      );
    }

    if (this.props.resume) {
      resume = (
        <Button
          className="rs-resume"
          onClick={this.resume}
          text="Resume"
        />
      );
    }

    return (
      <span className="rs-container">
        {play} {stop} {pause} {resume}
      </span>
    );
  }
}

Speech.propTypes = {
  text: PropTypes.string.isRequired,
  pitch: PropTypes.string,
  rate: PropTypes.string,
  volume: PropTypes.string,
  lang: PropTypes.string,
  voiceURI: PropTypes.string,
  voice: PropTypes.string,
  textAsButton: PropTypes.bool,
  displayText: PropTypes.string,
  disabled: PropTypes.bool,
  stop: PropTypes.bool,
  pause: PropTypes.bool,
  resume: PropTypes.bool,
  finish: PropTypes.func
};