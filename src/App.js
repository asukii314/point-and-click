import { Component } from 'react';
import Game from './Game'
import './App.css';

import Room1Config from './config/room1.yaml';
import Room2Config from './config/room2.yaml';
import ItemsConfig from './config/items.yaml'

const fetch = require('node-fetch');

export default class App extends Component {
  render() {
    let configMap = {
      room1: Room1Config,
      room2: Room2Config
    }
    return (
      <div className="App">
        <Game
          defaultRoom="room1"
          itemsConfig={ItemsConfig}
          roomsConfig={configMap}
        />
      </div>
    );
  }
}
