import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddDirector from './AddDirector';
import EditDirector from './EditDirector';
import Popup from "reactjs-popup";
import Rating from 'material-ui-rating'

const TYPE = 'directors'

function Directors() {
    const [directorList, setDirectorList] = useState([])

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setDirectorList(data)
                console.log(data)
            })
    }, [])

    const deleteDirector = id => {
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
        <div className="Directors">
            <div className="Directors_Container">
                <h3>Directors</h3>
                {directorList.map(director => 
                    <figure key={director.id}>
                    <img src={director.image}/>
                        <figcaption>{director.name}</figcaption>
                        <p>{`Date of birth: ${director.birth_date}`}</p>
                        <p>{`Directed: ${director.directed}`}</p>
                        <Rating 
                            value={director.rating} 
                            max={5} 
                            readOnly={(userServices.checkIsAuth() && already_voted(director.users_voted)) ? false : true}
                            onChange={(value) => 
                                onRatingchange(value, director.id, director.rating, 
                                               director.rating_count, director.users_voted)}
                        />
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <button id="delete-director" onClick={() => deleteDirector(director.id)}>Delete</button>
                            <Popup class="modal" modal trigger={<button className="edit_button">Edit</button>}>
                                <EditDirector directorID={director.id} />
                            </Popup>
                        </React.Fragment>}
                    </figure>
                )}
                {userServices.checkIsAuth() && <AddDirector />}
            </div>
        </div>
    );
}
export default Directors;