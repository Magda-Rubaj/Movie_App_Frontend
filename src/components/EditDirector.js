import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select'
import resourceServices from '../services/resourceServices';

const TYPE = 'directors'

function EditDirector({directorID}) {

    const [movieList, setMovieList] = useState([])
    const [directedList, setRoleList] = useState([])
    const [directedToAdd, setRolesToAdd] = useState([])

    const { register, handleSubmit, setValue } = useForm()
    
    useEffect(() => {
        resourceServices.getResource(directorID, TYPE)
            .then(data => {
                setValue('name', data.name)
                setValue('birth_date', data.birth_date)
                setRoleList(data.directed)
            })

        resourceServices.getResourceList('movies')
            .then(data => {
                const movie_data = data.map(movie => 
                    ({value: movie.id, label: movie.title})
                ).filter(value => !directedList.includes(value))
                setMovieList(movie_data)
            })
    }, []);

    const handleSelectChange = selected => {
        selected = selected.map(directed => directed.value)
        setRolesToAdd(selected)
    }

    const editDirector = data => {
        console.log(directedList)
        const patchData = JSON.stringify({
            name: data.name,
            birth_date: data.birth_date,
            directed: [...directedList, ...directedToAdd]
        });
        resourceServices.patchResource(directorID, patchData, TYPE);
        let imageForm = new FormData();
        const image = data.image[0]
        if(image){
            imageForm.append('image', image, image.name);
        }
        resourceServices.patchImage(directorID, imageForm, TYPE)
        window.location.reload()
    }

    return (
        <div className="EditDirector">
                <form onSubmit={handleSubmit(editDirector)}>
                    Name<br/>
                    <input {...register('name')}/><br/>
                    Date of birth<br/>
                    <input {...register('birth_date')}/><br/>
                    <br/>
                    Image<br/>
                    <input {...register('image')} type="file" accept="image/png, image/jpeg"/><br/>
                    <br/>
                    <Select options={movieList} onChange={handleSelectChange} isMulti/>
                    <input type="submit" value="Save"/>
                </form>               
        </div>
    );
}

export default EditDirector;