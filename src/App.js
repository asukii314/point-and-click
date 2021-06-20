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
    return this.state.inventoryItems.map(item => item.id).includes(item.id) ||
           this.state.usedItems.map(item => item.id).includes(item.id);
  }

  itemClickHandler = (clickedItem) => {
    let clickInteractionFound = false;
    clickedItem.interactions?.forEach((interaction) => {
      if(interaction.type === 'click') {
        const hiddenItem = interaction.itemGained;

        if(hiddenItem && !this.playerHasLooted(hiddenItem)) {
          clickInteractionFound = true;
          const image = new window.Image();
          image.src = `images/${hiddenItem.id}.png`;
          image.onload = () => {
            this.setState({
              ...this.state,
              text: interaction.text,
              inventoryItems: [
                ...this.state.inventoryItems,
                {
                  ...hiddenItem,
                  image
                }
              ]
            });
          }
        }
      }
    })
    if(!clickInteractionFound) {
      this.setState({
        ...this.state,
        text: clickedItem.description
      });
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
