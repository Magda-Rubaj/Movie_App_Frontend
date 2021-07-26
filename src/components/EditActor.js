import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select'
import resourceServices from '../services/resourceServices';
import { Button, Modal } from 'react-bootstrap';

const TYPE = 'actors'

function EditActor({actorID}) {

    const [movieList, setMovieList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [rolesToAdd, setRolesToAdd] = useState([])
    const [fetched, setFetched] = useState(false)

    const { register, handleSubmit, setValue } = useForm()
    
    useEffect(() => {
        if(!fetched){
            resourceServices.getResource(actorID, TYPE)
                .then(data => {
                    setValue('name', data.name)
                    setValue('birth_date', data.birth_date)
                    setRoleList(data.roles)
                    setFetched(true)
                })
        }
        else{
            resourceServices.getResourceList('movies')
                .then(data => {
                    const movie_data = data.map(movie => 
                        ({value: movie.id, label: movie.title})
                    ).filter(movie => !roleList.map(role => role.id).includes(movie.value))
                    setMovieList(movie_data)
                })
        }
    }, [fetched]);

    const handleSelectChange = selected => {
        selected = selected.map(role => ({id:role.value}))
        setRolesToAdd(selected)
    }

    const editActor = data => {
        console.log(roleList)
        const patchData = JSON.stringify({
            name: data.name,
            birth_date: data.birth_date,
            roles: [...roleList, ...rolesToAdd]
        });
        resourceServices.patchResource(actorID, patchData, TYPE);
        let imageForm = new FormData();
        const image = data.image[0]
        if(image){
            imageForm.append('image', image, image.name);
        }
        resourceServices.patchImage(actorID, imageForm, TYPE)
        //window.location.reload()
    }

    return (
        <div className="EditActor">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={handleSubmit(editActor)}>
                            Name<br/>
                            <input {...register('name')}/><br/>
                            Date of birth<br/>
                            <input {...register('birth_date')}/><br/>
                            <br/>
                            Image<br/>
                            <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                            <br/>
                            <Select options={movieList} onChange={handleSelectChange} isMulti/>
                            <Button variant="primary" type="submit">Save</Button>
                        </form>   
                </Modal.Body>
            </Modal.Dialog>          
        </div>
            
    );
}

export default EditActor;