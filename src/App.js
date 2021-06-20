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


  playerHasLooted(itemId) {
    return this.state.inventoryItems.includes(itemId) ||
           this.state.usedItems.includes(itemId);
  }

  itemClickHandler = (clickedItem) => {
    if(clickedItem.interaction?.type !== 'click') {
      this.setState({
        ...this.state,
        text: clickedItem.text
      });
      return;
    }

    const hiddenItem = clickedItem.interaction.itemGained;
    if(this.playerHasLooted(hiddenItem)) {
      this.setState({
        ...this.state,
        text: clickedItem.text
      });
      return;
    }

    this.setState({
      ...this.state,
      inventoryItems: [
        ...this.state.inventoryItems,
        hiddenItem
      ],
      text: clickedItem.interaction.text
    })

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
