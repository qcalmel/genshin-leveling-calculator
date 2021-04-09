import Item from "./Item";
import '../styles/Items.css'

const Items = ({data,title,setItems,items}) => {



    return (
        <div>
        <h3 className='items-title'>{title}</h3>
    <div className='items'>
        {data.map(({id,name,img})=>(
            <Item label={name} img={img} items={items} setItems={setItems} id={id}/>
        ))}
    </div>
    </div>
    )
}




export default Items