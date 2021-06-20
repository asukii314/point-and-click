import { Component } from 'react';
import { Layer, Rect, Image } from 'react-konva';

export default class InventoryBar extends Component {
  constructor() {
    super();
    this.state = {
      lastInvCoords: {
        x: 0,
        y: 0
      },
    };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = "images/key01.png";
    image.onload = () => {
      this.setState({
        ...this.state,
        image: image
      });
    }
  }

  dragStartHandler = (e) => {
    this.setState({
      ...this.state,
      lastInvCoords: {
        x: e.target.attrs.x,
        y: e.target.attrs.y
      }
    })
  }

  dragEndHandler = (item, e) => {
    this.refs[item].position(this.state.lastInvCoords);
    this.refs[item].parent.draw();
  }

  renderInventorySlot = (item, i) => {
    return (
      <Rect
        key={i}
        x={(5 + 50*(i % 10))}
        y={515 + Math.floor(i/10) * 50}
        width={40}
        height={40}
        fill="grey"
        shadowBlur={10}
        shadowOpacity={0.4}
      />
    )
  }

  renderInventoryItem = (item, i) => {
    return (
      <Image
        key={i}
        ref={item}
        x={(5 + 50*(i % 10))}
        y={515 + Math.floor(i/10) * 50}
        width={40}
        height={40}
        image={this.state.image}
        draggable
        onMouseDown={this.dragStartHandler}
        onDragEnd={this.dragEndHandler.bind(this, item)}
      />
    )
  }

  render() {
    return (
      <Layer className='inventoryLayer'>
        <Rect
          x={0}
          y={510}
          width={500}
          height={50*Math.ceil(this.props.maxInventorySlots/10)}
          fill="dimgray"
          shadowBlur={10}
        />
        {[...Array(parseInt(this.props.maxInventorySlots)).keys()].map(this.renderInventorySlot)}
        {this.props.items?.map(this.renderInventoryItem)}
      </Layer>
    );
  }
}
