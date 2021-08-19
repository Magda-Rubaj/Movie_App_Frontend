import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import { useHistory } from "react-router-dom";
import userServices from '../services/userServices';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import { Button } from 'react-bootstrap';
import Rating from 'material-ui-rating'
import Popup from "reactjs-popup";

const TYPE = 'movies'

function Movies() {
    const [movieList, setMovieList] = useState([])
    let history = useHistory();

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setMovieList(data)
            })
    }, [])

    const deleteMovie = id => {
        resourceServices.deleteResource(id, TYPE);
        history.go(0)
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
        history.go(0)
    }

    const already_voted = users => {
        const id = userServices.getUserID();
        return !users.includes(id)
    }

    return (
        <div className="Movies">
            <div className="Movies_Container">
                {movieList.map(movie => 
                    <figure key={movie.id}>
                        <img src={movie.image}/>
                        <div className="fig">
                        <div className="figHead">
                            <figcaption>{`${movie.title} (${movie.production_year})`}</figcaption>
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
                        </div>
                        <p>{movie.description}</p>
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <Button variant="primary" className="delete-movie" onClick={() => deleteMovie(movie.id)}>Delete</Button >
                            <Popup class="modal" modal trigger={<Button variant="outline-primary" className="edit_button">Edit</Button>}>
                                <EditMovie movieID={movie.id} />
                            </Popup>
                        </React.Fragment>}
                        </div>
                    </figure>
                )}
                {userServices.checkIsAuth() &&  
                <Popup class="modal" modal trigger={<Button variant="primary" className="add_button">Add movie</Button>}>
                    <AddMovie />
                </Popup>}
            </div>
        </div>
    );
}
export default Movies;