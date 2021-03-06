import React, { Component } from 'react';
import { movies } from './getMovies';
export default class Poster extends Component {
  render() {
    let movie = movies.results[0];
    return (<>
            {
              movie == ''? <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>:
              <div className="card poster-card">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top poster-img"/>
                <h1 className="card-title poster-title">{movie.original_title}</h1>
                <p className="card-text poster-text">{movie.overview}</p>
              </div>
            }
            </>);
  }
}
