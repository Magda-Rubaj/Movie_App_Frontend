import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddActor from './AddActor';
import EditActor from './EditActor';
import Popup from "reactjs-popup";

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

    return (
        <div className="Actors">
            <div className="Actors_Container">
                <h3>Actors</h3>
                {actorList.map(actor => 
                    <figure key={actor.id}>
                    <img src={actor.image}/>
                        <figcaption>{actor.name}</figcaption>
                        <p>{`Date of birth: ${actor.birth_date}`}</p>
                        <p>{`Played in: ${actor.roles}`}</p>
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <button id="delete-actor" onClick={() => deleteActor(actor.id)}>Delete</button>
                            <Popup class="modal" modal trigger={<button className="edit_button">Edit</button>}>
                                <EditActor actorID={actor.id} />
                            </Popup>
                        </React.Fragment>}
                    </figure>
                )}
                {userServices.checkIsAuth() && <AddActor />}
            </div>
        </div>
    );
}
export default Actors;