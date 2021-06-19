import logo from './logo.svg';
import room from './room2.png';
import './App.css';
import { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dotX: -10,
      dotY: -10,
      lastClicked: 'nothing yet',
      pillow: {
        opacity: 0
      },
      balloon: {
        opacity: 0
      }
    };
  }

  clickHandler = (item, e) => {
    this.setState((state) => {
      return {
        ...state,
        dotX: e.evt.pageX,
        dotY: e.evt.pageY,
        lastClicked: item
      }
    })
  }

  hoverHandler = (item) => {
    this.setState((state) => {
      return {
        ...state,
        [item]: {
          opacity: 0.2
        }
      }
    })
  }

  hoverEndHandler = (item,e) => {
    this.setState((state) => {
      return {
        ...state,
        [item]: {
          opacity: 0
        }
      }
    })
  }

  render() {
    return (
      <div className="App">
      <Stage className='canvas' width='500' height='500'>
        <Layer>
          <Line
            x={-5}
            y={-8}
            opacity={this.state.pillow.opacity}
            points={[133,258,141,265,149,271,158,277,175,275,188,271,203,269,199,279,202,292,196,303,188,312,188,324,185,329,177,332,165,334,154,336,141,341,130,340,124,328,121,317,122,307,131,303,143,299,151,295,143,290,133,285,129,271,129,260]}
            fill='orange'
            closed
            onClick={this.clickHandler.bind(this, 'pillow')}
            onMouseover={this.hoverHandler.bind(this, 'pillow')}
            onMouseleave={this.hoverEndHandler.bind(this, 'pillow')}
          />
          <Line
            x={-10}
            y={-5}
            opacity={this.state.balloon.opacity}
            points={[464,283,461,207,460,197,442,192,430,173,418,152,414,134,413,107,428,85,449,77,469,80,483,101,492,126,491,145,489,166,481,183,466,196,469,282]}
            fill='orange'
            closed
            onClick={this.clickHandler.bind(this, 'balloon')}
            onMouseover={this.hoverHandler.bind(this, 'balloon')}
            onMouseleave={this.hoverEndHandler.bind(this, 'balloon')}
          />
        </Layer>
      </Stage>
      <div  >
        <div className='dot' style={{left: this.state.dotX-5, top: this.state.dotY-5}}/>
        <img src={room} className="room-img" />
      </div>
      <header className="App-header">
        You last clicked on: <b>{this.state.lastClicked}</b>
      </header>
      </div>
    );
  }
}
