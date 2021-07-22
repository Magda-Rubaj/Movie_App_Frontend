import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import Popup from "reactjs-popup";

const TYPE = 'actors'

function AddActor() {

    const { register, handleSubmit} = useForm()

    const addActor = data => {
        let postData = new FormData();
        postData.append('name', data.name);
        postData.append('birth_date', data.birth_date);
        const image = data.image[0]
        if(image){
            postData.append('image', image, image.name);
        }
        postData.append('added_by', userServices.getUserID());
        resourceServices.postResource(postData, TYPE);
        window.location.reload()
    }

    return (
        <div className="AddActor">
            <Popup class="modal" modal trigger={<button className="add_button">Add</button>}>
                <form onSubmit={handleSubmit(addActor)}>
                    Name<br/>
                    <input {...register('name')}/><br/>
                    Date of birth<br/>
                    <input {...register('birth_date')} type="date"/><br/>
                    <br/>
                    Image<br/>
                    <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                    <br/>
                    <input type="submit" value="Save"/>
                </form>              
            </Popup>
        </div>
    );
}

export default AddActor;