import React from 'react';
import SpeechRecognition from 'react-speech-recognition';
import Speech from '../../TextToSpeech/speech';
import { Card } from 'react-bootstrap'
import { categories, questions } from '../../components/common/assets/content/content';

class FeaturePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognizing: false,
      index: 0,
      text: '',
      expect: false,
      score: 0,
      totalQuestions: 0,
      next: false,
    };
    this.questions = [];
    this.statements = [];
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

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  finish = () => {
    const {index} = this.state;
    // ToDo: Condition for all questions answered
    if (!this.state.expect && !this.state.next){
      this.setState({
        text: `Say A for ${this.questions[index].ch[0].value}, Say B for ${this.questions[index].ch[1].value},
        Say C for ${this.questions[index].ch[2].value}, Say D for ${this.questions[index].ch[3].value},`,
        expect: true,
      });
    }else if (!this.state.expect && this.state.next) {
      this.setState({
        text: this.questions[index].q,
        expect: false,
        next: false,
      })
    } else{
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
    });
    this.checkAnswer();
  }

  checkAnswer() {
    const {index, score, totalQuestions} = this.state;
    if(this.props.transcript.toLowerCase() === this.questions[index].a.toLowerCase()){
      if(index === totalQuestions - 1) {
        this.setState({
          score: score + 1,
          text: "Hurray. OK let's check how you did.",
          expect: false,
          index: index + 1,
          next: true,
        })
        this.props.history.push({
          pathname: '/results',
          state: { score: this.state.score, total: this.state.totalQuestions },
        })
        return;
      } else {
        this.setState({
          score: score + 1,
          text: "Hurray. OK let's move on.",
          expect: false,
          index: index + 1,
          next: true,
        })
      }
    } else {
      if(index === totalQuestions - 1) {
        this.setState({
          text: "Oh no. No problem. OK let's check how you did.",
          expect: false,
          index: index + 1,
          next: true,
        })
        this.props.history.push({
          pathname: '/results',
          state: { score: this.state.score, total: this.state.totalQuestions },
        })
        return;
      } else {
        this.setState({
          text: "Oh no. Wrong answer. OK let's move on.",
          expect: false,
          index: index + 1,
          next: true,
        })
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
    if(this.props.location.state.category) {
      let category = categories.filter((cat) => cat.id === this.props.location.state.category.toLowerCase());
      console.log(this.state.category);
      this.questions = questions.filter((question) => question.category.toLowerCase() === category[0].category.toLowerCase());
      this.setState({
        text: this.questions[0].q,
        expect: false,
        totalQuestions: this.questions.length,
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

export default SpeechRecognition(options)(FeaturePage);