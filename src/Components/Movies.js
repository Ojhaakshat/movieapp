import React, { Component } from 'react';
// import { movies } from './getMovies';
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            page_arr: [1],
            currentPage: 1,
            movies: [],
            favourites: []
        }
    }
    async componentDidMount() {
        //sideffects
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c601404f39cfa24cd4b4a50dd0491459&page=${this.state.currentPage}`);
        // console.log(res);
        const favourites = JSON.parse(localStorage.getItem('movies') || "[]");
        this.setState({
            movies: [...res.data.results],
            favourites: favourites.map(ele => ele.id)
        })
        // console.log("Mounting done");
    }
    changeMovies = async ()=> {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c601404f39cfa24cd4b4a50dd0491459&language=en-US&&page=${this.state.currentPage}`);
        this.setState({
            movies: [...res.data.results]
        })
    }
    
    
    updateNext = () => {
        let temparr = [];
        for(let i = 1; i <= this.state.page_arr.length+1; i++) {
            temparr.push(i);
        }
        //this.setState function is asynchronys, so wo pass changeMovies functions' definition as a callback to it, so that it is called only after setState function is complet
        this.setState({
            page_arr: [...temparr],
            currentPage: this.state.currentPage + 1
        }, this.changeMovies)
        
    }

    updatePrev = () => {
       if(this.state.currentPage != 1) {
           this.setState({
               currentPage: this.state.currentPage - 1
           }, this.changeMovies)
       }
    }

    setPage = (pg_no) => {
        if(this.currentPage != pg_no) { 
            this.setState({
                currentPage: pg_no,
            }, this.changeMovies)   
        }
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        if(this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((ele) => (
                ele.id != movie.id
            )) 
        } else {
            oldData.push(movie)
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        console.log(oldData);
        // setItem function is synchronus hence we do no need to give  as callback here
        let temp = oldData.map((ele) => ele.id);
        oldData = [...temp]
        
        this.setState({
            favourites: [...temp]
        })
    }

    render() {
        // let movie = movies.results;
        // console.log("Render done");
        return (
            <>
                {
                    console.log(this.state.favourites)
                }
                {
                    
                    this.state.movies.length == 0?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>:
                    <div>
                        <h3 className='text-center'><strong>Trending</strong></h3>
                        <div className="movies-list">
                            {
                                this.state.movies.map((ele) => (
                                    <div className="card movies-card" onMouseEnter={() => this.setState({hover:ele.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                        <img src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}   alt={ele.title} className="card-img-top movies-img"/>
                                        <h1 className="card-title movies-title">{ele.original_title}</h1>
                                        {/* <p className="card-text poster-text">{ele.overview}</p> */}
                                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>

                                            {
                                                this.state.hover == ele.id && 
                                                <a className='btn btn-primary movies-button' onClick={() => this.handleFavourites(ele)}>
                                                {this.state.favourites.includes(ele.id)?"Remove from favourites":"Add to favourites"}</a>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" onClick={this.updatePrev}>Previous</a></li>
                                    {/* <li className="page-item"><a className="page-link" >1</a></li>
                                    <li className="page-item"><a className="page-link" >2</a></li>
                                    <li className="page-item"><a className="page-link" >3</a></li> */}
                                    {
                                        this.state.page_arr.map((ele)=>(
                                            <li className="page-item"><a className="page-link" onClick={()=>this.setPage(ele)}>{ele}</a></li>
                                        ))
                                    }
                                    <li className="page-item"><a className="page-link" onClick={this.updateNext}>Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }
            </>
        );
  }
}
