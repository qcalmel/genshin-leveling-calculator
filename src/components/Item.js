import {useEffect} from 'react'
import '../styles/Item.css'
import IncrementalInput from "./IncrementalInput";

const Item = ({label,img,setItems, id}) => {

    // const [itemCount , setItemCount] = useState(0)
    // useEffect(()=>{
    //     setItems({...items,[id]:itemCount})
    // },[itemCount])
    // const checkValue = (value) => {
    //     const r = /^\d+$/
    //     console.log("test")
    //     if (value === '' || (r.test(value)) && value <= 999) {
    //         setItemCount(value ? parseInt(value) : 0)
    //     }
    // }
    return (
        <div className='item'>
            <img className='item-img' src={img}/>
        <label className='item-label'>
            {label}
        </label>
        {/*    <div className='item-control'>*/}
        {/*    <button className='item-button' disabled={!itemCount} onClick={()=>setItemCount(itemCount - 1)}>-</button>*/}
        {/*<input className='item-input' type='text' value={itemCount} onChange={(e)=>checkValue(e.target.value)} size={1}/>*/}
        {/*    <button className='item-button' disabled={itemCount >= 999} onClick={()=>setItemCount(parseInt(itemCount) + 1)}>+</button>*/}
        {/*    </div>*/}
            <IncrementalInput id={id} setItems={setItems} maxValue={999} minValue={0}/>
        </div>

    )
}

export default Item