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
    this.refs[item.id].position(this.state.lastInvCoords);
    this.refs[item.id].parent.draw();
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
        ref={item.id}
        key={item.id}
        x={(5 + 50*(i % 10))}
        y={515 + Math.floor(i/10) * 50}
        width={40}
        height={40}
        image={item.image}
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
