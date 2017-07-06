import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor () {
    super();
    this.state = {
      artists: [],
      field: ""
    };
    this.onInputType = this.onInputType.bind(this)
  }

  onInputType(e){
    this.setState({field: e.target.value})
  }
  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  render () {

    const artists = this.state.artists;

    return (
      <div>
        <form className="form-group" style={{ marginTop: '20px' }}>
          <input
            onChange = {this.onInputType}
            className="form-control"
            placeholder="Enter artist name"
          />
        </form>
        <h3>Artists</h3>
        <div className="list-group">
          {
            artists.map(artist => {
              if(artist.name.toLowerCase().match(this.state.field.toLowerCase())){
                return (
                  <div className="list-group-item" key={artist.id}>
                    <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                  </div>
                );
              } else {
                return null
              }
            })
          }
        </div>
      </div>
    );
  }
}
