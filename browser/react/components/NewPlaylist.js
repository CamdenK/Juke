import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {
  constructor(props){
    super()
    this.defaultState = {value: "", dirty: false}
    this.state = {input:this.defaultState}
    this.onInputType = this.onInputType.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  shouldHaveWarning(){
    return this.state.input.dirty && this.isEmpty()
  }

  isEmpty(){
    return this.state.input.value.length === 0
  }

  isValidLength(){
    const maxLength = 16
    return this.state.input.value.length <= maxLength
  }

  isValidInput(){
    return !this.isEmpty() && this.isValidLength()
  }

  onInputType(e){
    this.setState({input:{value: e.target.value,dirty: true}})
  }

  onFormSubmit(e){
    // this.setState({input:e.target.value})
    e.preventDefault()
    let name = this.state.input.value
    this.props.addPlaylist(name)
    this.setState({input: this.defaultState})
  }

  render(){
  return (
    <div className="well">
      <form className="form-horizontal" onSubmit = { this.onFormSubmit}>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input value = {this.state.input.value}className="form-control" type="text" onChange = {this.onInputType}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button disabled = {!this.isValidInput()} type="submit" className="btn btn-success">Create Playlist</button>
            </div>
          </div>


        </fieldset>
        {this.shouldHaveWarning() ? <div className="alert alert-warning">Please enter a name</div> : null}
      </form>
    </div>
  )}

}
