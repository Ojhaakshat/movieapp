import React, { Component } from 'react';
// import { movies } from './getMovies';
export default class Favourite extends Component {
  
    constructor() {
        super();
        this.state = {
            genres: [],
            current_genre: 'All Genres',
            movies: [],
            currentText: '',
            current_page: 1,
            limit: 3
        }
    }
    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('movies')||"[]");
        console.log(data);
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let temparr = []
        temparr.push('All Genres');
        data.forEach((ele) => {
            if(!temparr.includes(genreids[ele.genre_ids[0]])) {
                temparr.push(genreids[ele.genre_ids[0]]);
            }
        })
        this.setState({
            genres: [...temparr],
            movies: [...data]
        })
        // console.log(temparr);
        
    }
    
    handleGenre = (Genre) => {
        this.setState({
            current_genre: Genre
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function(a, b) {
            return b.popularity - a.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityInc = () => {
        let temp = this.state.movies;
        temp.sort(function(a, b) {
            return a.popularity - b.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function(a, b) {
            return b.vote_average - a.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingInc = () => {
        let temp = this.state.movies;
        temp.sort(function(a, b) {
            return a.vote_average - b.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    handlePagechange =  page => {
        this.setState({
            current_page: page
        })
    }

    handleDelete = id => {
        let temparr = []
        temparr = this.state.movies.filter((ele) => ele.id != id)
        this.setState({
            movies: [...temparr]
        })
        localStorage.setItem('movies', JSON.stringify(temparr))
    }
    render() {
        // const movie = movies.results;
        // console.log(movie);
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filter_arr = [];
        //filter acc to current genre
        if(this.state.current_genre == 'All Genres') {
            filter_arr = this.state.movies
        } else {
            filter_arr = this.state.movies.filter((ele) => genreids[ele.genre_ids[0]] == this.state.current_genre)
        }

        // filter acc to search
        filter_arr = filter_arr.filter((ele) => (
            ele.original_title.toLowerCase().includes(this.state.currentText.toLowerCase())
        ))

        let pages = Math.ceil(filter_arr.length/this.state.limit);
        let pages_arr = [];
        for(let i = 1; i <= pages; i++){
            pages_arr.push(i);
        } 

        let si = (this.state.current_page - 1)*this.state.limit;
        let ei = si + this.state.limit;
        filter_arr =  filter_arr.slice(si, ei);

        return <div>
            <>
                <div className='main'>
                    <div className='row'>
                        <div className='col-12  col-lg-3 favourite-genres'>
                            <ul className="list-group">
                                {
                                    this.state.genres.map((ele) => (
                                        this.state.current_genre == ele ?
                                        <li className='list-group-item' style={{background: '#2979e3', color:'white', fontWeight: 'bold'}} onClick={()=>this.handleGenre(ele)}>{ele}</li>:
                                        <li className='list-group-item' style={{background: 'white', color:'#2979e3'}} onClick={()=>this.handleGenre(ele)}>{ele}</li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                        <div className='col-12 col-lg-9 favourite-list'>
                            <div className='row'>
                                <input type="text" className='input-group-text col' value={this.state.currentText} onChange={(e)=>this.setState({currentText : e.target.value})} placeholder='Search'/>
                                <input type="number" className='input-group-text col' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})} placeholder='Limit'/>
                            </div>
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i className="fas fa-sort-down" onClick={this.sortPopularityInc}></i></th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i className="fas fa-sort-down" onClick={this.sortRatingInc}></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filter_arr.map((ele) => (
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`} style={{width: '5rem', marginRight:'0.5rem'}}></img>{ele.original_title}</td>
                                                    <td>{genreids[ele.genre_ids[0]]}</td>
                                                    <td>{ele.popularity}</td>
                                                    <td>{ele.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(ele.id)}> Remove</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li> */}
                                    {
                                        pages_arr.map((ele) => (
                                            <li className="page-item"><a className="page-link" onClick={() => this.handlePagechange(ele)}>{ele}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        </div>;
    }
}
