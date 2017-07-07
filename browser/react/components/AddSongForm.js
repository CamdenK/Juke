import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default 
class AddSong extends Component{
    constructor(props){
        super()
        this.state = {
            selectedSongId: 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        this.setState({selectedSongId: parseInt(e.target.value)})
    }
    
    handleSubmit(e){
        const playlistId = this.props.playlistId
        const songId = this.state.selectedSongId
        e.preventDefault()
        this.props.addSong(songId)
    }

    render(){
    let songs = this.props.songs
    return(
        <div className="well">
            <form onSubmit={this.handleSubmit} className="form-horizontal" noValidate name="songSelect">
                <fieldset>
                    <legend>Add to Playlist</legend>
                    <div className="form-group">
                        <label htmlFor="song" className="col-xs-2 control-label">Song</label>
                        <div className="col-xs-10">
                            <select value = {this.state.selectedSongId} onChange= {this.handleChange} className="form-control" name="song">
                                {
                                    songs && songs.map(song =>
                                        <option value={song.id} key={song.id}>{song.name}</option>
                                )}

                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-10 col-xs-offset-2">
                            <button type="submit" className="btn btn-success">Add Song</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>)
    }
}
