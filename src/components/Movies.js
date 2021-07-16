import React, { useEffect, useState } from 'react';
import movieServices from '../services/movieServices';
import AddMovie from './AddMovie';

function Movies() {
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        movieServices.getMovieList()
            .then(data => {
                setMovieList(data)
            })
    }, [])

    const deleteMovie = id => {
        movieServices.deleteMovie(id);
        window.location.reload()
    }

    return (
        <div className="Movies">
            <div className="Movies__Container">
                <h3>Movies</h3>
                {movieList.map(movie => 
                    <figure key={movie.id}>
                        <img src={movie.image}/>
                        <figcaption>{`${movie.title}(${movie.production_year})`}</figcaption>
                        <p>{movie.description}</p>
                        <button id="delete-movie" onClick={() => deleteMovie(movie.id)}>Delete</button>
                    </figure>
                )}
                <AddMovie /> 
            </div>
        </div>
    );
}
export default Movies;