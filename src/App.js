import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
 } from "react-router-dom";
import Game from './Game';
import Navbar from './Navbar';
import './App.css';

import Room1Config from './config/room1.yaml';
import Room2Config from './config/room2.yaml';
import DemoGameItemsConfig from './config/items.yaml'

const fetch = require('node-fetch');

// TODO: make this auto-load based on subfolder structures
const gamesConfig = {
  "demo-game": {
    name: "Demo Game",
    defaultRoom: "room1",
    itemsConfig: DemoGameItemsConfig,
    roomsConfig: {
      room1: Room1Config,
      room2: Room2Config,
    }
  }
}

export default class App extends Component {
  render() {
    return (
      <Router>
      <Navbar gamesConfig={gamesConfig} />
      <div className="App">


        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/contact">
            <ContactPage />
          </Route>
          <Route path="/:id" children={<RoutedGame />} />
        </Switch>

        </div>
      </Router>
    );
  }
}

function HomePage() {
  return (
    <div className="infopage" style={{color: "lightgrey", marginLeft: "25px"}}>
      <h3> What is this? </h3>
      <p>
        I'm making a thing. For making adventure games. Like,
        your old school point-and-click style browser games.
        I guess you could call it a "game engine", but that makes
        it sound fancier than it is. ¯\_(ツ)_/¯
      </p>
      <p>
        I've got a short basic <Link id="demo-game-body-embed" to="demo-game">demo game</Link> up
        right now, which shows (most of) what you can do with this thing. For example:
      </p>
      <ul>
        <li> Clicking on stuff in rooms <i>(wow!!)</i></li>
        <li> Finding hidden objects, tracking inventory items, and auto-removing "spent" items </li>
        <li> Combining inventory items together </li>
        <li> Dragging-and-dropping inventory items onto specific spots in the room, to interact </li>
        <li> Locking doors & other objects with either keys or numerical passcodes </li>
        <li> Conditional game states - i.e. only do X if Y has happened first </li>
        <li> Optional custom dialogue for any interactions (or combos of interactions) - including ones that <i>don't</i> do anything</li>
      </ul>
      <h3>Can *I* make an adventure game using this, then?</h3>
      <p>
        I mean, if you want, sure! You'll have to write some text* files
        formatted in a particular way, to set up things like "when someone
        clicks on X, then Y should happen." While you don't have
        to know how to write code yourself to work with those text files,
        it <i>would</i> probably make it a bit easier. If you're interested,
        let me know, and I'll get you some examples of how to format those
        text files in a way that the "engine" can understand -- then just
        send the results over to me, along with whatever images you want to use,
        and I'll happily get your game hosted on this site :)
      </p>

      <p>
        If writing those config files from scratch is a bit too intimidating,
        I'm also thinking about making a fancier "admin interface"
        at some point. Then, instead of needing to write the config text files
        by hand, you could click on things & fill out forms in a "game-maker-style"
        UI, which would then generate your config files for you & let you test
        the game as you build it.
        If you're interested at <i>that</i> point, let me know, and I'll ping you when it's live :)
      </p>

      <small><i>* to be pedantic, I'm using .YAML files, not .txt files, but whatever... close enough.</i></small>

      <h3>Can I do [insert thing here] with your game maker?</h3>
      <p>
        If you see it in the list of bullet points up above: <b>YES!</b>
      </p>
      <p>
        If you don't: <b>STILL MAYBE!</b> I might just not have bothered to write it out explicitly.
        Feel free to <Link id="contact-body-embed" to="contact">get in touch</Link>:
        if it's possible, I'll happily walk you through how to do it, and if not, I'll
        happily take feature requests :)
      </p>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="infopage" style={{color: "lightgrey", marginLeft: "25px"}}>
      <h3> Get in touch </h3>
      <p>
        If you're interested in creating a game in this engine, have
        feedback or feature requests, or just want to learn more in general,
        feel free to DM me anytime!
      </p>
      <p>
      <ul>
      <li><b>Twitch:</b> <a href="https://twitch.tv/asukii314">asukii314</a></li>
      <li><b>Discord:</b> <a href="https://discord.gg/VWFmZMNCA4">Join my server</a>, or DM me @asukii#7286</li>
      <li><b>Email:</b> <a href="mailto:asukii314.twitch@gmail.com">asukii314.twitch@gmail.com</a></li>
      </ul>
      </p>
    </div>
  );
}

function RoutedGame() {
  let { id } = useParams();
  if(!gamesConfig[id]) {
    return <p style={{color: "white"}}><b>404:</b> No game with that ID could be found.</p>
  }
  return (
    <Game
      key={id}
      defaultRoom={gamesConfig[id].defaultRoom}
      itemsConfig={gamesConfig[id].itemsConfig}
      roomsConfig={gamesConfig[id].roomsConfig}
    />
  );
}
