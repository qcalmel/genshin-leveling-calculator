import {worldLevelInfos} from '../data/worldLevel'
import {materials} from "../data/materials";
import {books} from "../data/books";
import {gameConst} from "../data/gameConst";

import InputNumber from "./InputNumber";
import Items from "./Items";
import IncrementalInput from "./IncrementalInput";
import SelectInput from "./SelectInput";

import "../styles/Form.css"

const worldLevelOptions = worldLevelInfos.reduce(
    (acc, worldLevel) => acc.includes(worldLevel.worldLevel) ? acc : acc.concat(worldLevel.worldLevel), []
)
const primogemRefillOptions = gameConst.primogemRefill.cost.reduce((acc, refill, index) => [...acc, index], [])
const hasAscendedChoice = (actualLevel) => {
    const allowedLevel = [20, 40, 50, 60, 70, 80]
    return allowedLevel.includes(actualLevel)
}

const Form = ({formData, setFormData, setBooks, setMaterials}) => {
    return (
        <div className='form'>
            <SelectInput id='worldLevel' label='World Level' options={worldLevelOptions} setFormData={setFormData}/>
            <div className='form-input'>
                <label>Actual Level</label>
                <IncrementalInput id='actualLevel' maxValue={89} minValue={1} setItems={setFormData}/>
            </div>
            {hasAscendedChoice(formData.actualLevel) &&
            (
                <div className='form-input'>
                    <label>Ascended ? </label>
                    <input type='checkbox'
                           onChange={(e) => setFormData("isAscended", e.target.checked)}/>
                </div>
            )}
            <div className='form-input'>
                <label>Target Level</label>
                <IncrementalInput id='targetLevel' maxValue={90} minValue={1} setItems={setFormData}/>
            </div>
            <InputNumber id='moras' label='Moras' max='99999999' min='0' updateFormData={setFormData}/>
            <SelectInput id='primogemRefill' label='Primogem Refill' options={primogemRefillOptions}
                         setFormData={setFormData}/>
            <Items title='Character Ascension Materials' data={materials} setItems={setMaterials}/>
            <Items title='Character Xp Materials' data={books} setItems={setBooks}/>
        </div>
    )
}
export default Form