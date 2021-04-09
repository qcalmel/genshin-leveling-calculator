import {useState, useEffect} from 'react'
import '../styles/IncrementalInput.css'

const IncrementalInput = ({id, setItems, maxValue, minValue}) => {
    const [value, setValue] = useState(minValue)
    useEffect(() => {
        setItems(id, value)
    }, [value])
    const checkValue = (value) => {
        const regex = /^\d+$/
        if (value === '' || (regex.test(value)) && value <= maxValue && value >= minValue) {
            setValue(value ? parseInt(value) : minValue)
        }
    }
    return (
        <div className='item-control'>
            <button className='item-button' disabled={value <= minValue} onClick={() => setValue(value - 1)}>-</button>
            <input className='item-input' type='text' value={value} onChange={(e) => checkValue(e.target.value)}/>
            <button className='item-button' disabled={value >= maxValue}
                    onClick={() => setValue(parseInt(value) + 1)}>+
            </button>
        </div>
    )
}

export default IncrementalInput