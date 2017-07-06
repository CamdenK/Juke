import React from 'react';
import Songs from './Songs';
import axios from 'axios';


export default 
class SinglePlaylist extends React.Component {
    constructor(props){
        super()
        this.state = {playlist: {}}
    }

    componentDidMount(){
        let playlistId = this.props.match.params.playlistId;
        axios.get(`/api/playlists/${playlistId}`)
        .then(res => res.data)
        .then(playlist => this.setState({playlist: playlist}))
        .catch(console.error.bind(console))
    }
    render(){
        console.log(this.state.playlist)
        return (<div>
            <h3>{this.state.playlist.name}</h3>
            <Songs songs={this.state.playlist.songs} /> 
            {this.state.playlist.songs && !this.state.playlist.songs.length && <small>No songs.</small>}
            <hr />
        </div>)
    }
}