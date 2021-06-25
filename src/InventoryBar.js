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
      hoveredIdx: 0,
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
    const layer = this.refs[item.id].parent;
    this.refs[item.id].position(this.state.lastInvCoords);
    let slot = this.getInventorySlotForCoords(e.target.getStage().getPointerPosition());
    if(slot !== null && this.props.items.length > slot) {
      this.props.onCombineItems(item, this.props.items[slot])
    } else {
      this.props.onDragEnd(item.interactions, e.target.getStage().getPointerPosition());
    }
    layer.draw();
  }

  getInventorySlotForCoords = ({x, y}) => {
    let xSlot = Math.ceil((x*this.props.scale-5)/50);
    let ySlot = Math.ceil((y*this.props.scale-510)/50);
    if(xSlot < 1 || xSlot > 10 || ySlot < 1) return null;
    let posn = 10*(ySlot-1)+(xSlot-1);
    if(posn >= this.props.maxInventorySlots) return null;
    return posn;
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

  renderInventoryItem = (item, i, isHovered=false) => {
    if(!item || (!isHovered && i === this.state.hoveredIdx)) return;
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
        onDragStart={this.dragStartHandler}
        onDragEnd={this.dragEndHandler.bind(this, item)}
        onClick={this.props.onClick.bind(this, item)}
        onTap={this.props.onClick.bind(this, item)}
        onMouseOver={() => {
          this.setState({
            ...this.state,
            hoveredIdx: i
          })
        }}
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

        {/* render the item being hovered after all others, so it has the highest z-index when dragged */}
        {this.props.items?.map((item, i) => (this.renderInventoryItem(item, i)))}
        {this.props.items.length > 0 && this.renderInventoryItem(this.props.items[this.state.hoveredIdx], this.state.hoveredIdx, true)}
      </Layer>
    );
  }
}
