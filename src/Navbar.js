import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
 } from "react-router-dom";
import './Navbar.css';

export default class Navbar extends Component {
  _renderGameLink = (gameID) => {
    return (
      <li>
        <Link id={gameID} to={`/${gameID}`}>{this.props.gamesConfig[gameID].name}</Link>
      </li>
    )
  }

  render() {
    return (
      <nav role='navigation'>
        <b>Asukii's Adventure Game Maker</b>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">Games</a>
            <ul>
              {Object.keys(this.props.gamesConfig).map(this._renderGameLink)}
            </ul>
          </li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    );
  }
}
