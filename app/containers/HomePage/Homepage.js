import React from 'react';
import Speech from '../../TextToSpeech/speech';
import Dictaphone from '../../SpeechRecognition/Dictaphone'

export default class HomePage extends React.PureComponent {
  finish = () => {
    alert("i am done");
  };
  render() {
    const textstyle = {
      play: {
        hover: {
          backgroundColor: "red",
          color: "black"
        },
        button: {
          padding: "4",
          fontFamily: "Helvetica",
          fontSize: "1.0em",
          cursor: "pointer",
          pointerEvents: "none",
          outline: "none",
          backgroundColor: "gray",
          border: "none",
          width: "28",
          height: "28"
        }
      },
      resume: {
        hover: {
          backgroundColor: "black",
          color: "red"
        },
        button: {
          padding: "4",
          fontFamily: "Helvetica",
          fontSize: "1.0em",
          cursor: "pointer",
          pointerEvents: "none",
          outline: "none",
          backgroundColor: "inherit",
          border: "none",
          width: "28",
          height: "28"
        }
      },
      pause: {
        hover: {
          backgroundColor: "black",
          color: "red"
        },
        button: {
          padding: "4",
          fontFamily: "Helvetica",
          fontSize: "1.0em",
          cursor: "pointer",
          pointerEvents: "none",
          outline: "none",
          backgroundColor: "inherit",
          border: "none",
          width: "28",
          height: "28"
        }
      },
      stop: {
        hover: {
          backgroundColor: "black",
          color: "white"
        },
        button: {
          padding: "4",
          fontFamily: "Helvetica",
          fontSize: "1.0em",
          cursor: "pointer",
          pointerEvents: "none",
          outline: "none",
          backgroundColor: "inherit",
          border: "none",
          width: "28",
          height: "28"
        }
      }
    };
    return (
      <article>
        <div className="home-page">
          <section className="centered">
            <h2>Hey champ, welcome to test your knowledge</h2>
            <Speech
            stop={true}
            pause={true}
            resume={true}
            text="Hey champ, welcome to test your knowledge. Please choose your category."
            finish={this.finish}
            styles={textstyle}
            />
            <Dictaphone />
          </section>
        </div>
      </article>
    );
  }
}
