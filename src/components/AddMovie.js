import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import movieServices from '../services/movieServices';
import Popup from "reactjs-popup";

function AddMovie() {

    const { register, handleSubmit} = useForm()

    const addMovie = data => {
        let postData = new FormData();
        postData.append('title', data.title);
        postData.append('production_year', data.production_year);
        const image = data.image[0]
        if(image){
            postData.append('image', image, image.name);
        }
        postData.append('description', data.description);
        movieServices.postMovie(postData);
        window.location.reload()
    }

    return (
        <div className="AddMovie">
            <Popup class="modal" modal trigger={<button className="add_button">Add</button>}>
                <form onSubmit={handleSubmit(addMovie)}>
                    Title<br/>
                    <input {...register('title')}/><br/>
                    Year of production<br/>
                    <input {...register('production_year')}/><br/>
                    <br/>
                    Image<br/>
                    <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                    <br/>
                    Description<br/>
                    <input {...register('description')}/><br/>
                    <input type="submit" value="Save"/>
                </form>              
            </Popup>
        </div>
    );
}

export default AddMovie;