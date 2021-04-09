import {icons} from '../data/icons'
import "../styles/Icon.css"

const Icon = ({iconName}) => {
    const path = icons.find(icon => icon.name === iconName).path
    return (
        <img className='result-img' height={23} src={path} alt={iconName + " icon"}/>
    )
}

export default Icon