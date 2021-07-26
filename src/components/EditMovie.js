import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import resourceServices from '../services/resourceServices';
import { Button, Modal } from 'react-bootstrap';

const TYPE = 'movies'

function EditMovie({movieID}) {

    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        resourceServices.getResource(movieID, TYPE)
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
        const image = data.image[0]
        if(image){
            patchData.append('image', image, image.name);
        }
        resourceServices.patchResource(movieID, patchData, TYPE);
        window.location.reload()
    }

    return (
        <div className="EditMovie">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(editMovie)}>
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
                        <Button variant="primary" type="submit">Save</Button>
                    </form>  
                </Modal.Body>
            </Modal.Dialog>                
        </div>
    );
}

export default EditMovie;