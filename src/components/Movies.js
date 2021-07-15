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
    return (
        <div className="Movies">
            <div className="Movies__Container">
                {movieList.map(movie => {
                    <figure key={movie.id}>
                        <img src={movie.image}/>
                        <figcaption>{`${movie.title}(${movie.production_year})`}</figcaption>
                        <p>{movie.description}</p>
                    </figure>
                })}
            </div>
        </div>
    );
}
export default Movies;