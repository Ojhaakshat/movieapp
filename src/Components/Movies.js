import React, { Component } from 'react';
import { movies } from './getMovies';
export default class Movies extends Component {
  render() {
        let movie = movies.results;
        return (
            <>
                {
                    movie.length == 0?
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>:
                    <div>
                        <h3 className='text-center'><strong>Trending</strong></h3>
                        <div className="movies-list">
                            {
                                movie.map((ele) => (
                                    <div className="card movies-card">
                                        <img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}   alt={ele.title} className="card-img-top movies-img"/>
                                        <h1 className="card-title movies-title">{ele.original_title}</h1>
                                        {/* <p className="card-text poster-text">{ele.overview}</p> */}
                                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                            <a className='btn btn-primary movies-button'>Use me</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </>
        );
  }
}
