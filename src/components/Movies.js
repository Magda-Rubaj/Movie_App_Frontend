import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';

const TYPE = 'movies'

function Movies() {
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setMovieList(data)
            })
    }, [])

    const deleteMovie = id => {
        resourceServices.deleteResource(id, TYPE);
        window.location.reload()
    }

    return (
        <div className="Movies">
            <div className="Movies_Container">
                <h3>Movies</h3>
                {movieList.map(movie => 
                    <figure key={movie.id}>
                        <img src={movie.image}/>
                        <figcaption>{`${movie.title}(${movie.production_year})`}</figcaption>
                        <p>{movie.description}</p>
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <button id="delete-movie" onClick={() => deleteMovie(movie.id)}>Delete</button>
                            <EditMovie movieID={movie.id} />
                        </React.Fragment>}
                    </figure>
                )}
                {userServices.checkIsAuth() &&  <AddMovie />}
            </div>
        </div>
    );
}
export default Movies;