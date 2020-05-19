import React from 'react';
import SpeechRecognition from 'react-speech-recognition';
import Speech from '../../TextToSpeech/speech';
import { Card } from 'react-bootstrap';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      expect: false,
      recognizing: false,
    };
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

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  finish = () => {
    this.setState({
      recognizing: true
    }, this.handleListen); 
  };

  handleListen = () => {
    this.props.startListening();
    setTimeout(this.haltListening, 3000);
  };

  haltListening = () =>{
    this.props.stopListening();
    this.setState({
      recognizing: false,
    });
    this.checkAnswer();
  }

  checkAnswer() {
    if(this.props.transcript.toLowerCase() === 'yes') {
      this.props.history.push('/');
    } else {
      this.setState({
        text: 'Well done kid! See you soon. Bye.',
        expect: false,
      })
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
    if(this.props.location.state.score && this.props.location.state.total) {
      const {score, total} = this.props.location.state;
      this.setState({
        text: `You scored ${score} out of ${total}. Do you want to play again? Say yes or no.`,
        expect: true,
      })
    }
  }
  render() {
    return (
      <Card>
        <div className="centered">
          <h2>{this.state.text}</h2>
          {!this.state.recognizing && !this.state.text !== '' && (
            <Speech
              text={this.state.text}
              finish={this.finish}
              ref={(cd) => this.child = cd}
            />
          )}
          <span>{this.props.transcript}</span>
        </div>
      </Card>
    );
  }
}

const options = {
  autoStart: false,
  continuous: false,
};

export default SpeechRecognition(options)(ResultsPage);