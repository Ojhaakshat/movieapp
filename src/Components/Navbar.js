import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', padding:'0.5'}}>
            <h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Movies App</h1>
            <h3 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h3>
        </div>
    );
  }
}
