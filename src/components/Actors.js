import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import { useHistory } from "react-router-dom";
import AddActor from './AddActor';
import EditActor from './EditActor';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Rating from 'material-ui-rating'

const TYPE = 'actors'

function Actors() {
    const [actorList, setActorList] = useState([])
    let history = useHistory();

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setActorList(data)
            })
    }, [])

    const deleteActor = id => {
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

    const already_voted = users =>{
        const id = userServices.getUserID();
        return !users.includes(id)
    }

    return (
        <div className="Actors">
            <div className="Actors_Container">
                {actorList.map(actor => 
                    <figure key={actor.id}>
                        <img src={actor.image}/>
                        <div className="fig">
                            <div className="figHead">
                                <figcaption>{actor.name}</figcaption>
                                <Rating 
                                    value={actor.rating} 
                                    max={5} 
                                    readOnly={(userServices.checkIsAuth() && already_voted(actor.users_voted)) ? false : true}
                                    onChange={(value) => 
                                        onRatingchange(
                                            value, 
                                            actor.id, 
                                            actor.rating, 
                                            actor.rating_count,
                                            actor.users_voted
                                        )}
                                />
                            </div>
                            <p>{`Date of birth: ${actor.birth_date}`}</p>
                            <p>{`Played in: ${actor.roles.map(role => role.title)}`}</p>
                            {userServices.checkIsAdmin() &&
                            <React.Fragment>
                                <Button variant="primary" className="delete-actor" onClick={() => deleteActor(actor.id)}>Delete</Button>
                                <Popup class="modal" modal trigger={<Button variant="outline-primary" className="edit_button">Edit</Button>}>
                                    <EditActor actorID={actor.id} />
                                </Popup>
                            </React.Fragment>}
                        </div>
                    </figure>
                )}
                {userServices.checkIsAuth() && 
                <Popup class="modal" modal trigger={<Button variant="primary" className="add_button">Add actor</Button>}>
                    <AddActor />
                </Popup>}
            </div>
        </div>
    );
}
export default Actors;