import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist'
import SinglePlaylist from './SinglePlaylist'
import axios from 'axios';

export default class Main extends Component {

  constructor(){
    super()
    this.state = {playlists:[]}
    this.addPlaylist = this.addPlaylist.bind(this)
  }

  componentDidMount(){
    axios.get('/api/playlists')
    .then(res => res.data)
    .then(playlistList => this.setState({playlists: playlistList}))
    .catch(console.error.bind(console))
  }

  addPlaylist(name){
    axios.post('/api/playlists', {name})
    .then(res => res.data)
    .then(result => this.setState({playlists: [...this.state.playlists, result]}))
    .catch(()=>console.log('addPlaylist OOPS'))

  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists = {this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/playlist/:playlistId" component={SinglePlaylist}/>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path = '/playlists' render={(props) => <NewPlaylist addPlaylist={this.addPlaylist}/>}/>
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
