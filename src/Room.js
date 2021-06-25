import { Component } from 'react';
import { Layer, Line, Image, Circle } from 'react-konva';
import YAML from 'yaml'

const fetch = require('node-fetch');

export default class Room extends Component {
  constructor() {
    super();
    this.state = {
      dotX: -10,
      dotY: -10,
      hoveredItem: null,
      image: null,
      items: {}
    };
  }

  componentDidMount() {
    fetch(this.props.config)
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
    image.src = `images/${this.props.bgImage}`;
    image.onload = () => {
      this.setState({
        ...this.state,
        image: image
      });
    }
  }

  _clickHandler = (itemId, e) => {
    const coords = e.target.getStage().getPointerPosition();
    this.props.onClick(this.state.items[itemId])
    this.setState((state) => {
      return {
        ...state,
        dotX: coords.x,
        dotY: coords.y,
      }
    })
  }

  _hoverHandler = (itemId) => {
    this.setState((state) => {
      return {
        ...state,
        hoveredItem: itemId
      }
    })
  }

  _hoverEndHandler = (itemId, e) => {
    this.setState((state) => {
      return {
        ...state,
        hoveredItem: null
      }
    })
  }

  _mouseUpHandler = (itemId, e) => {
    const pos = e.target.getStage().getPointerPosition();
    this.props.onMouseUp(itemId, pos)
    this.setState({
      ...this.state,
      dotX: pos.x,
      dotY: pos.y
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
        onClick={(e) => this._clickHandler(itemId, e)}
        onTap={(e) => this._clickHandler(itemId, e)}
        onMouseover={this._hoverHandler.bind(this, itemId)}
        onMouseleave={this._hoverEndHandler.bind(this, itemId)}
        onTouchEnd={this._mouseUpHandler.bind(this, itemId)}
        onMouseUp={this._mouseUpHandler.bind(this, itemId)}
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
          x={this.props.scale * this.state.dotX}
          y={this.props.scale * this.state.dotY}
          radius='4'
          fill='red'
        />
        {Object.keys(this.state.items).map(this.renderClickableItem)}
      </Layer>
    );
  }
}
