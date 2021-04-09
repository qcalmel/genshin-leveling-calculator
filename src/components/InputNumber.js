import {useState,useEffect} from 'react'
import "../styles/InputNumber.css"

const InputNumber = ({id,label,min,max,placeholder,updateFormData}) => {
    const [inputValue, setInputValue] = useState(0)
    useEffect(() => {
        updateFormData(id, inputValue)
    }, [inputValue])
    const checkValue = (value) => {
        if ((value >= parseInt(min) && value <= parseInt(max) && !value.includes('.')) || !value){
            setInputValue(value)
            updateFormData(id,parseInt(value))
        }
    }
    return (
        <div className='form-input'>
        <label>{label}</label>
        <input type='text' value={inputValue} onChange={(e)=>checkValue(e.target.value)} placeholder={placeholder}/>
        </div>
    )
}

export default InputNumber