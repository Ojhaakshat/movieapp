import React, { Component } from 'react';
import { movies } from './getMovies';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: ''
        }
    }
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
                                    <div className="card movies-card" onMouseEnter={() => this.setState({hover:ele.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                        <img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}   alt={ele.title} className="card-img-top movies-img"/>
                                        <h1 className="card-title movies-title">{ele.original_title}</h1>
                                        {/* <p className="card-text poster-text">{ele.overview}</p> */}
                                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>

                                            {
                                                this.state.hover == ele.id && <a className='btn btn-primary movies-button'>Add to Fav</a>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" >Previous</a></li>
                                    <li className="page-item"><a className="page-link" >1</a></li>
                                    <li className="page-item"><a className="page-link" >2</a></li>
                                    <li className="page-item"><a className="page-link" >3</a></li>
                                    <li className="page-item"><a className="page-link">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }
            </>
        );
  }
}
