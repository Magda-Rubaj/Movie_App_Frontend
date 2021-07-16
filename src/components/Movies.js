import React, { useEffect, useState } from 'react';
import movieServices from '../services/movieServices';

function Movies() {
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        movieServices.getMovieList()
            .then(data => {
                setMovieList(data)
            })
    }, [])

    const delete_movie = id => {
        movieServices.deleteMovie(id)
        window.location.reload();
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
                        <button id="delete-movie" onClick={delete_movie(movie.id)}>Delete</button>
                    </figure>
                )}
            </div>
        </div>
    );
}
export default Movies;