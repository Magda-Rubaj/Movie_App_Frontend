import React, { useEffect, useState } from 'react';
import movieServices from '../services/movieServices';
import Popup from "reactjs-popup";

function AddMovie() {

    const [title, setTitle] = useState("")
    const [productionYear, setProductionYear] = useState(null)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")

    const addMovie = e => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('production_year', productionYear);
        if(image){
            data.append('image', image, image.name);
        }
        data.append('description', description);
        movieServices.postMovie(data);
        window.location.reload()
    }

    const titleChanged = e => {
        setTitle(e.target.value);
    };

    const yearChanged = e => {
        setProductionYear(e.target.value);
    };

    const imageChanged = e => {
        setImage(e.target.files[0]);
    };

    const descriptionChanged = e => {
        setDescription(e.target.value);
    };

    return (
        <div className="AddMovie">
            <Popup class="modal" modal trigger={<button className="add_button">Add</button>}>
                <form onSubmit={addMovie}>
                    Title<br/>
                    <input 
                        type="text"
                        value={title}
                        onChange={titleChanged}
                    /><br/>
                    Year of production<br/>
                    <input 
                        type="number"
                        onChange={yearChanged}
                    /><br/>
                    Image<br/>
                    <input 
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={imageChanged}
                    /><br/>
                    Description<br/>
                    <input 
                        type="text"
                        onChange={descriptionChanged}
                    /><br/>
                    <input type="submit" value="Save"/>
                </form>               
            </Popup>
        </div>
    );
}

export default AddMovie;