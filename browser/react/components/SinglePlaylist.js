import React from 'react';
import Songs from './Songs';
import AddSongForm from './AddSongForm';
import axios from 'axios';


export default 
class SinglePlaylist extends React.Component {
    constructor(props){
        super()
        this.state = {
            playlist: {},
            warning: false
        }
        this.warning = false
        this.addSong = this.addSong.bind(this)
    }
    componentDidMount(){
        let playlistId = this.props.match.params.playlistId;
        this.setPlaylistById(playlistId)
    }
    
    setPlaylistById(playlistId){
        axios.get(`/api/playlists/${playlistId}`)
        .then(res => res.data)
        .then(playlist => this.setState({playlist: playlist}))
        .catch(console.error.bind(console))
    }

    getAllSongs(){
        axios.get('/api/songs')
        .then(res => res.data)
        .then(songs => this.songs = songs)
    }

    addSong(songId){
        const playlistId = this.state.playlist.id
        const songs = this.state.playlist.songs
        const songsIdArr = songs.map(song => song.id)
        if (!songsIdArr.includes(songId)){
            this.setState({warning: false})
            axios.post(`/api/playlists/${playlistId}/songs/`, {id: songId})
            .then(res => this.setPlaylistById(playlistId))
            .catch(console.error.bind(console))
        }
        else{
            this.setState({warning: true})
        }
    }

    componentWillReceiveProps(nextProps){
        let newPlaylistId = nextProps.match.params.playlistId 
        if (newPlaylistId !== this.state.playlist.id) this.setPlaylistById(newPlaylistId)
    }

    render(){
        this.getAllSongs()
        return (<div>
            <h3>{this.state.playlist.name}</h3>
            <Songs songs={this.state.playlist.songs} /> 
            {this.state.playlist.songs && !this.state.playlist.songs.length && <small>No songs.</small>}
            <hr />
            <AddSongForm songs={this.songs} playlistId={this.state.playlist.id} addSong = {this.addSong}/>
            {console.log('warning:', this.state.warning)}
            {this.state.warning ?  <div className="alert alert-warning">Song already in playlist</div> : null}

        </div>)
    }
}