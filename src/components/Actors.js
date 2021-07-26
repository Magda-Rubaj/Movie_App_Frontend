import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddActor from './AddActor';
import EditActor from './EditActor';
import Popup from "reactjs-popup";
import Rating from 'material-ui-rating'

const TYPE = 'actors'

function Actors() {
    const [actorList, setActorList] = useState([])

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setActorList(data)
                console.log(data)
            })
    }, [])

    const deleteActor = id => {
        resourceServices.deleteResource(id, TYPE);
        window.location.reload()
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
        console.log(users, id)
        return !users.includes(id)
    }

    return (
        <div className="Actors">
            <div className="Actors_Container">
                <h3>Actors</h3>
                {actorList.map(actor => 
                    <figure key={actor.id}>
                    <img src={actor.image}/>
                        <figcaption>{actor.name}</figcaption>
                        <p>{`Date of birth: ${actor.birth_date}`}</p>
                        <p>{`Played in: ${actor.roles.map(role => role.title)}`}</p>
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
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <button id="delete-actor" onClick={() => deleteActor(actor.id)}>Delete</button>
                            <Popup class="modal" modal trigger={<button className="edit_button">Edit</button>}>
                                <EditActor actorID={actor.id} />
                            </Popup>
                        </React.Fragment>}
                    </figure>
                )}
                {userServices.checkIsAuth() && 
                <Popup class="modal" modal trigger={<button className="add_button">Add</button>}>
                    <AddActor />
                </Popup>}
            </div>
        </div>
    );
}
export default Actors;