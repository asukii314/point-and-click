import { Component } from 'react';
import { Stage, Layer, Line, Rect, Image } from 'react-konva';
import InventoryBar from './InventoryBar';
import Room from './Room';
import Room1Config from './room_config/room1.yaml';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      maxInventorySlots: 10,
      inventoryItems: [],
      usedItems: [],
      text: '',
      lastMouseUp: {
        itemId: null,
        x: 0,
        y: 0
      },
      room: {
        config: Room1Config,
        bgImage: 'room1.png'
      }
    };
  }

  playerHasLooted(item) {
    return this.state.inventoryItems.map(item => item.id).includes(item.id) ||
           this.state.usedItems.map(item => item.id).includes(item.id);
  }

  _handleLostItems = (interaction) => {
    const lostItem = interaction.itemsLost?.[0]; // TODO: one-to-many support here
    if(!lostItem) return false;

    const newInventory = this.state.inventoryItems.filter((item) => item.id != lostItem.id);
    this.setState({
      ...this.state,
      text: interaction.text,
      inventoryItems: newInventory,
      usedItems: [
        ...this.state.usedItems,
        lostItem
      ]
    });
    return true;
  }

  _handleHiddenItems = (interaction) => {
    const hiddenItem = interaction.itemsGained?.[0]; // TODO: one-to-many support here

    if(hiddenItem && !this.playerHasLooted(hiddenItem)) {
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
      return true;
    }
    return false;
  }

  itemClickHandler = (clickedItem) => {
    let clickInteractionFound = false;
    clickedItem.interactions?.forEach((interaction) => {
      if(interaction.type === 'click') {
        clickInteractionFound = clickInteractionFound
                                  || this._handleHiddenItems(interaction)
                                  || this._handleLostItems(interaction);
      }
    })
    if(!clickInteractionFound) {
      this.setState({
        ...this.state,
        text: clickedItem.description
      });
    }
  }

  logLastMouseUp = (itemId, x, y) => {
    this.setState({
      ...this.state,
      lastMouseUp: {
        itemId, x, y
      }
    })
  }

  itemDragHandler = (dragInteractions, x, y) => {
    let found = false;
    dragInteractions?.forEach((interaction) => {
      if(interaction.target === this.state.lastMouseUp.itemId
        && x === this.state.lastMouseUp.x
        && y === this.state.lastMouseUp.y
      ) {
        this.setState({
          ...this.state,
          text: interaction.text
        });
        found = true;
        this._handleHiddenItems(interaction);
        this._handleLostItems(interaction);
      }
    });
    if(!found) {
      this.setState({
        ...this.state,
        text: 'Nothing happens.'
      });
    }
  }

  render() {
    return (
      <div className="App">
      <Stage className='canvas' width='500' height='1000'>
        <Room
          config={this.state.room.config}
          bgImage={this.state.room.bgImage}
          onClick={this.itemClickHandler}
          onMouseUp={this.logLastMouseUp}
        />
        <InventoryBar
          items={this.state.inventoryItems}
          maxInventorySlots={this.state.maxInventorySlots}
          onClick={this.itemClickHandler}
          onDragEnd={this.itemDragHandler}
        />
      </Stage>

      <header className="App-header">
        {this.state.text}
      </header>
      </div>
    );
  }
}
