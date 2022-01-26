import React, { Component } from 'react';
import { movies } from './getMovies';
export default class Favourite extends Component {
  render() {
    const movie = movies.results;
    console.log(movie);
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    return <div>
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-3 favourite-genres'>
                        <ul className="list-group">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                            <li className="list-group-item">A fourth item</li>
                            <li className="list-group-item">And a fifth one</li>
                        </ul>
                    </div>
                    <div className='col-9 favourite-list'>
                        <div className='row'>
                            <input type="text" className='input-group-text col'/>
                            <input type="number" className='input-group-text col'/>
                        </div>
                        <div className='row'>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movie.map((ele) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`} style={{width: '5rem', marginRight:'0.5rem'}}></img>{ele.original_title}</td>
                                                <td>{genreids[ele.genre_ids[0]]}</td>
                                                <td>{ele.popularity}</td>
                                                <td>{ele.vote_average}</td>
                                                <td><button type="button" class="btn btn-danger">Danger</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    </div>;
  }
}
