import { Component } from 'react';
import { Layer, Line, Image, Circle } from 'react-konva';
import YAML from 'yaml'
import Room1Config from './room_config/Room1.yaml';
const fetch = require('node-fetch');

export default class Room1 extends Component {
  constructor() {
    super();
    this.state = {
      dotX: -10,
      dotY: -10,
      lastClicked: 'nothing yet',
      hoveredItem: null,
      image: null,
      items: {}
    };
  }

  componentDidMount() {
    fetch(Room1Config)
      .then(r => r.text())
      .then(text => {
        this.setState((state) => {
          return {
            ...state,
            items: YAML.parse(text)
          };
        });
      })

    const image = new window.Image();
    image.src = "images/Room1.png";
    image.onload = () => {
      this.setState({
        ...this.state,
        image: image
      });
    }
  }

  _clickHandler = (itemId, e) => {
    this.props.onClick(this.state.items[itemId])
    this.setState((state) => {
      return {
        ...state,
        dotX: e.evt.pageX,
        dotY: e.evt.pageY,
        lastClicked: itemId
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

  renderClickableItem = (itemId) => {
    const item = this.state.items[itemId];
    if(!item) return;
    return (
      <Line
        key={itemId}
        points={item.position.points}
        x={item.position.offsetX}
        y={item.position.offsetY}
        opacity={this.state.hoveredItem === itemId ? 0.2 : 0}
        fill='orange'
        closed
        onClick={this._clickHandler.bind(this, itemId)}
        onMouseover={this._hoverHandler.bind(this, itemId)}
        onMouseleave={this._hoverEndHandler.bind(this, itemId)}
      />
    )
  }


  render() {
    if(!this.state) return null;
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
        {Object.keys(this.state.items).map(this.renderClickableItem)}
      </Layer>
    );
  }
}
