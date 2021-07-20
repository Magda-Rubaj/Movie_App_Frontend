import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import movieServices from '../services/movieServices';
import Popup from "reactjs-popup";

function EditMovie({movieID}) {

    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        movieServices.getMovie(movieID)
            .then(data => {
                setValue('title', data.title)
                setValue('production_year', data.production_year)
                setValue('description', data.description)
            })
    }, []);

    const editMovie = data => {
        let patchData = new FormData();
        patchData.append('title', data.title);
        patchData.append('production_year', data.production_year);
        patchData.append('description', data.description);
        movieServices.patchMovie(movieID, patchData);
        window.location.reload()
    }

    return (
        <div className="EditMovie">
            <Popup class="modal" modal trigger={<button className="edit_button">Edit</button>}>
                <form onSubmit={handleSubmit(editMovie)}>
                    Title<br/>
                    <input {...register('title')}/><br/>
                    Year of production<br/>
                    <input {...register('production_year')}/><br/>
                    <br/>
                    Description<br/>
                    <input {...register('description')}/><br/>
                    <input type="submit" value="Save"/>
                </form>               
            </Popup>
        </div>
    );
}

export default EditMovie;