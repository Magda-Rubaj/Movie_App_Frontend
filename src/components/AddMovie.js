import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import { Button, Modal } from 'react-bootstrap';

const TYPE = 'movies'

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
        postData.append('added_by', userServices.getUserID());
        resourceServices.postResource(postData, TYPE);
        window.location.reload()
    }

    return (
        <div className="AddMovie">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Add movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit(addMovie)}>
                    Title<br/>
                    <input {...register('title')}/><br/>
                    Year of production<br/>
                    <input {...register('production_year')} type="number"/><br/>
                    <br/>
                    Image<br/>
                    <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                    <br/>
                    Description<br/>
                    <input {...register('description')}/><br/>
                    <Button variant="primary" type="submit">Save</Button>
                </form>   
                </Modal.Body>
            </Modal.Dialog>              
        </div>
    );
}

export default AddMovie;