import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', padding:'0.5'}}>
            <Link to='/' style={{textDecoration: 'None'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Movies App</h1></Link>
            <Link to='/favourite' style={{textDecoration: 'None'}}><h3 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h3></Link>
        </div>
    );
  }
}
