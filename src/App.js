import { Component } from 'react';
import { Stage, Layer, Line, Rect, Image } from 'react-konva';
import InventoryBar from './InventoryBar';
import Room1 from './Room1';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      maxInventorySlots: 10,
      inventoryItems: [],
      usedItems: [],
      text: ''
    };
  }


  playerHasLooted(item) {
    return this.state.inventoryItems.includes(item.contents) ||
           this.state.usedItems.includes(item.contents);
  }

  itemClickHandler = (item) => {
    if(!item.contents) {
      this.setState({
        ...this.state,
        text: item.text
      });
      return;
    }

    if(this.playerHasLooted(item)) {
      this.setState({
        ...this.state,
        text: `${item.text} There is nothing more to be found here.`
      })
    } else {
      this.setState({
        ...this.state,
        inventoryItems: [
          ...this.state.inventoryItems,
          item.contents
        ],
        text: `${item.text} You find a ${item.contents.toLowerCase()}.`
      })
    }
  }

  render() {
    return (
      <div className="App">
      <Stage className='canvas' width='500' height='1000'>
        <Room1
          onClick={this.itemClickHandler}
        />
        <InventoryBar
          items={this.state.inventoryItems}
          maxInventorySlots={this.state.maxInventorySlots}
        />
      </Stage>

      <header className="App-header">
        {this.state.text}
      </header>
      </div>
    );
  }
}
