import {materials} from "../data/materials";
import "../styles/MaterialsRequired.css"

const MaterialRequired = ({materialsRequired}) => {

    return Object.keys(materialsRequired).map(function (material, keyIndex) {
        const materialDetails = materials.find((item) => item.id === material)
        return (
            <div className="material" key={material}>
                <div className="material-qty">{materialsRequired[material]}</div>
                <img className="material-img" src={materialDetails.img}/>
                <span className="material-name">{materialDetails.name}</span>
            </div>
        )
    })
}

export default MaterialRequired