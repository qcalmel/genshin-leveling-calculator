import {useState, useEffect} from 'react'
const SelectInput = ({id,label,options,setFormData}) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        setFormData(id, value)
    }, [value])

    return (
        <div className='form-input'>
            <label>{label}</label>
            <select value={value} onChange={(e) => setValue(parseInt(e.target.value))}>
                {options.map((option) => (
                    <option key={id + option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default SelectInput