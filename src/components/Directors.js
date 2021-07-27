import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import AddDirector from './AddDirector';
import EditDirector from './EditDirector';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Rating from 'material-ui-rating'

const TYPE = 'directors'

function Directors() {
    const [directorList, setDirectorList] = useState([])
    let history = useHistory();

    useEffect(() => {
        resourceServices.getResourceList(TYPE)
            .then(data => {
                setDirectorList(data)
            })
    }, [])

    const deleteDirector = id => {
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
        <div className="Directors">
            <div className="Directors_Container">
                {directorList.map(director => 
                    <figure key={director.id}>
                    <img src={director.image}/>
                    <div className="fig">
                        <div className="figHead">
                            <figcaption>{director.name}</figcaption>
                            <Rating 
                                value={director.rating} 
                                max={5} 
                                readOnly={(userServices.checkIsAuth() && already_voted(director.users_voted)) ? false : true}
                                onChange={(value) => 
                                    onRatingchange(value, director.id, director.rating, 
                                                director.rating_count, director.users_voted)}
                            />
                        </div>
                        <p>{`Date of birth: ${director.birth_date}`}</p>
                        <p>{`Directed: ${director.directed}`}</p>
                        {userServices.checkIsAdmin() &&
                        <React.Fragment>
                            <Button variant="primary" id="delete-director" onClick={() => deleteDirector(director.id)}>Delete</Button>
                            <Popup class="modal" modal trigger={<Button variant="outline-primary" className="edit_button">Edit</Button>}>
                                <EditDirector directorID={director.id} />
                            </Popup>
                        </React.Fragment>}
                        </div>
                    </figure>
                )}
                {userServices.checkIsAuth() && 
                <Popup class="modal" modal trigger={<Button variant="primary" className="add_button">Add director</Button>}>
                    <AddDirector />
                </Popup>}
            </div>
        </div>
    );
}
export default Directors;