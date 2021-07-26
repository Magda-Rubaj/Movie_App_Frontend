import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import Rating from 'material-ui-rating'
import Popup from "reactjs-popup";

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
        window.location.reload();
    }

    const onRatingchange = (value, id, currentRating, count, users) => {
        count = count + 1;
        const newRating = currentRating + ((value - currentRating) / count)
        const rating = JSON.stringify({
            rating: newRating,
            rating_count: count,
            users_voted: [...users, userServices.getUserID()]
        });
        resourceServices.patchResource(id, rating, TYPE)
        window.location.reload()
    }

    const already_voted = users =>{
        const id = userServices.getUserID();
        return !users.includes(id)
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
                        <Rating 
                            value={movie.rating} 
                            max={5} 
                            readOnly={(userServices.checkIsAuth() && already_voted(movie.users_voted)) ? false : true}
                            onChange={(value) => 
                                onRatingchange(
                                    value, 
                                    movie.id, 
                                    movie.rating, 
                                    movie.rating_count,
                                    movie.users_voted
                                )}
                        />
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <button id="delete-movie" onClick={() => deleteMovie(movie.id)}>Delete</button>
                            <Popup class="modal" modal trigger={<button className="edit_button">Edit</button>}>
                                <EditMovie movieID={movie.id} />
                            </Popup>
                        </React.Fragment>}
                    </figure>
                )}
                {userServices.checkIsAuth() &&  
                <Popup class="modal" modal trigger={<button className="edit_button">Add</button>}>
                    <AddMovie />
                </Popup>}
            </div>
        </div>
    );
}
export default Movies;