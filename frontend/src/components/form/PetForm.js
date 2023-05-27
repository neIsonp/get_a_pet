import { useState } from "react";
import formStyles from './Form.module.css'
import Input from './input.js'
import Select from "./Select";

export default function PetForm({petData, btnText, handleSubmit}) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors =['white', 'black', 'gray', 'caramel']

    function onFileChange(e){}
    function handleChange(e){}
    function handleColor(e){}

    return (
        <form className={formStyles.form_container}>
           <Input text='Pet image' type='file' name='images' handleOnChange={onFileChange} multiple={true}/>
           <Input text='Pet name' type='text' name='name' placeholder='Insert the name' value={pet.name || ''} handleOnChange={handleChange} />
           <Input text='Age' type='text' name='age' placeholder='Insert the age' value={pet.age || ''} handleOnChange={handleChange} />
           <Input text='weight' type='number' name='weight' placeholder='Insert the weight' value={pet.weight || ''} handleOnChange={handleChange} />
          <Select name='color' text='Select a color' options={colors} handleOnChange={handleColor} value={pet.color || ''}/>
           <input type="submit" value={btnText} />
        </form>
    );
}