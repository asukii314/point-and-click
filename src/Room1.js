import { Component } from 'react';
import { Layer, Line, Image, Circle } from 'react-konva';

export default class Room1 extends Component {
  constructor() {
    super();
    this.state = {
      dotX: -10,
      dotY: -10,
      lastClicked: 'nothing yet',
      hoveredItem: null,
      pillow: {
        opacity: 0
      },
      balloon: {
        opacity: 0
      },
      image: null
    };

    this.clickableItems = {
      'pillow1': {
        name: 'pillow',
        id: 'pillow1',
        position: {
          points: [133,258,141,265,149,271,158,277,175,275,188,271,203,269,199,279,202,292,196,303,188,312,188,324,185,329,177,332,165,334,154,336,141,341,130,340,124,328,121,317,122,307,131,303,143,299,151,295,143,290,133,285,129,271,129,260],
          offsetX: -5,
          offsetY: -8,
        },
        contents: 'Small key',
        text: "You look behind the pillow on the couch.",
        interactsWith: null
      },
      'balloon1': {
        name: 'balloon',
        id: 'balloon1',
        position: {
          points: [464,283,461,207,460,197,442,192,430,173,418,152,414,134,413,107,428,85,449,77,469,80,483,101,492,126,491,145,489,166,481,183,466,196,469,282],
          offsetX: -10,
          offsetY: -5
        },
        contents: null,
        text: "It's a large helium balloon. Seems pretty ordinary.",
        interactsWith: null
      }
    }
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = "images/Room1.png";
    image.onload = () => {
      this.setState({
        ...this.state,
        image: image
      });
    }
  }

  _clickHandler = (itemName, e) => {
    this.props.onClick(this.clickableItems[itemName])
    this.setState((state) => {
      return {
        ...state,
        dotX: e.evt.pageX,
        dotY: e.evt.pageY,
        lastClicked: itemName
      }
    })
  }

  _hoverHandler = (item) => {
    this.setState((state) => {
      return {
        ...state,
        hoveredItem: item
      }
    })
  }

  _hoverEndHandler = (item, e) => {
    this.setState((state) => {
      return {
        ...state,
        hoveredItem: null
      }
    })
  }

  renderClickableItem = (itemName) => {
    if(!this.clickableItems[itemName]) return null;
    return (
      <Line
        points={this.clickableItems[itemName].position.points}
        x={this.clickableItems[itemName].position.offsetX}
        y={this.clickableItems[itemName].position.offsetY}
        opacity={this.state.hoveredItem === itemName ? 0.2 : 0}
        fill='orange'
        closed
        onClick={this._clickHandler.bind(this, itemName)}
        onMouseover={this._hoverHandler.bind(this, itemName)}
        onMouseleave={this._hoverEndHandler.bind(this, itemName)}
      />
    )
  }


  render() {

    return (
      <Layer className='imgLayer'>
        <Image
          x={0}
          y={0}
          width={500}
          height={500}
          image={this.state.image}
        />
        <Circle
          x={this.state.dotX}
          y={this.state.dotY}
          radius='4'
          fill='red'
        />
        {Object.keys(this.clickableItems).map(this.renderClickableItem)}
      </Layer>
    );
  }
}
