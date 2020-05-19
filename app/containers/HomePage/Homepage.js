import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import Speech from '../../TextToSpeech/speech';
import { Card } from 'react-bootstrap';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

const statements = [
  {
    statement: "Say GK for General knowledge, or say S for Science.",
    expect: true,
  },
  {
    statement: "OK. We shall start in 5, 4, 3, 2, 1",
    expect: false,
  }
];

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: statements[0].statement,
      expect: statements[0].expect,
      category: "",
      recognizing: false,
      index: 0,
    };
    this.child = null;
  }

  _handleKeyDown = (event) => {
    switch( event.keyCode ) {
        case 32:
            this.child.play();
            break;
        default: 
            break;
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  finish = () => {
    if(this.state.index === statements.length - 1) {
      this.props.history.push({
        pathname: '/quiz',
        state: { category: this.state.category }
      })
      return;
    }
    if (!this.state.expect){
      this.setState({
        index: this.state.index + 1,
        text: statements[this.state.index + 1].statement,
        expect: statements[this.state.index + 1].expect,
      });
    }else{
      this.setState({
        recognizing: true
      }, this.handleListen);
    }
  };

  handleListen = () => {
    this.props.startListening();
    setTimeout(this.haltListening, 3000);
  };

  haltListening = () =>{
    this.props.stopListening();
    this.setState({
      recognizing: false,
      index: this.state.index + 1,
      text: statements[this.state.index + 1].statement,
      expect: statements[this.state.index + 1].expect,
      category: this.props.transcript,
    })
  }

  render() {
    return (
      <Card>
        <div className="home-page">
          <section className="centered">
          <h2>{this.state.text}</h2>
            {!this.state.recognizing && (
              <Speech
                text={this.state.text}
                finish={this.finish}
                ref={(cd) => this.child = cd}
              />
            )}
            <span>{this.props.transcript}</span>
          </section>
        </div>
      </Card>
    );
  }
}

HomePage.propTypes = propTypes;
const options = {
  autoStart: false,
  continuous: false,
};

export default SpeechRecognition(options)(HomePage);