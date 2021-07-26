import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import resourceServices from '../services/resourceServices';
import userServices from '../services/userServices';
import { Button, Modal } from 'react-bootstrap';

const TYPE = 'directors'

function AddDirector() {

    const { register, handleSubmit} = useForm()

    const addDirector = data => {
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
        <div className="AddDirector">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Add movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit(addDirector)}>
                    Name<br/>
                    <input {...register('name')}/><br/>
                    Date of birth<br/>
                    <input {...register('birth_date')} type="date"/><br/>
                    <br/>
                    Image<br/>
                    <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                    <br/>
                    <Button variant="primary" type="submit">Save</Button>
                </form>
                </Modal.Body>
            </Modal.Dialog>                  
        </div>
    );
}

export default AddDirector;