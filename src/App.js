import { Component } from 'react';
import { Stage } from 'react-konva';
import YAML from 'yaml';
import InventoryBar from './InventoryBar';
import Room from './Room';
import Room1Config from './config/room1.yaml';
import Room2Config from './config/room2.yaml';
import ItemsConfig from './config/items.yaml'
import './App.css';
const fetch = require('node-fetch');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      maxInventorySlots: 10,
      inventoryItems: [],
      usedItemIds: [],
      itemInfo: {},
      text: '',
      lastMouseUp: {
        itemId: null,
        x: 0,
        y: 0
      },
      room: 'room1'
    };

    this.configMap = {
      room1: Room1Config,
      room2: Room2Config
    }
  }

  componentDidMount() {
    fetch(ItemsConfig)
      .then(r => r.text())
      .then(text => {
        this.setState((state) => {
          return {
            ...state,
            itemInfo: YAML.parse(text)
          };
        });
      })
  }

  playerHasLooted(itemId) {
    return this.state.inventoryItems.map((item) => item.id).includes(itemId) ||
           this.state.usedItemIds.includes(itemId);
  }

  _handleLostItems = (interaction) => {
    const lostItemId = interaction.itemsLost?.[0]; // TODO: one-to-many support here
    if(!lostItemId) return false;

    const newInventory = this.state.inventoryItems.filter((item) => item.id !== lostItemId);
    this.setState({
      ...this.state,
      text: interaction.text,
      inventoryItems: newInventory,
      usedItemIds: [
        ...this.state.usedItemIds,
        lostItemId
      ]
    });
    return true;
  }

  _handleHiddenItems = (interaction) => {
    const hiddenItemId = interaction.itemsGained?.[0]; // TODO: one-to-many support here

    if(hiddenItemId && !this.playerHasLooted(hiddenItemId) && this.state.itemInfo[hiddenItemId]) {
      const hiddenItem = this.state.itemInfo[hiddenItemId];
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

  _handleRoomTransitions = (interaction) => {
    const room = interaction.newRoom;
    if(room) {
      this.setState({
        ...this.state,
        text: interaction.text,
        room
      });
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
                                  || this._handleLostItems(interaction)
                                  || this._handleRoomTransitions(interaction);
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
          key={this.state.room}
          config={this.configMap[this.state.room]}
          bgImage={`${this.state.room}.png`}
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
