import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import AddActor from './AddActor';

const TYPE = 'actors'

function Actors() {
    const [actorList, setActorList] = useState([])

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setActorList(data)
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
                     AddMovie<img src={actor.image}/>
                        <figcaption>{actor.name}</figcaption>
                        <p>{`Date of birth: ${actor.birth_date}`}</p>
                        <p>{`Played in: ${actor.roles}`}</p>
                        <button id="delete-actor" onClick={() => deleteActor(actor.id)}>Delete</button>
                    </figure>
                )}
                <AddActor /> 
            </div>
        </div>
    );
}
export default Actors;