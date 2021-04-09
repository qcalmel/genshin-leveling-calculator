import calculate from "../calculate"
import Icon from "./Icon";
import '../styles/Results.css'
import MaterialRequired from "./MaterialRequired";
import mora from '../assets/icons/mora.png'
import resin from '../assets/icons/resin.png'
import expBook from '../assets/icons/expBook.png'

const formatNumber = (num, div = ",") => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, div)
}

const shortNumber = (number) => {

    let newValue = number
    if(number >= 1000) {

        const suffixes = ["","K","M"]
        const suffixe = Math.floor(((""+number).length - 1) / 3)
        console.log(suffixe)
        const shortNumber = Math.round((number/Math.pow(1000,suffixe))*10)/10
        newValue ='~ ' + shortNumber + ' ' + suffixes[suffixe]
        console.log(newValue)
    }
    return newValue
}
console.log(shortNumber(5500))

const formatTime = (time) => {
    const days = Math.floor(time)
    const hours = Math.ceil(((time % 1) * 24))
    const formatedTime = '~ ' + (days ? days + 'd' : '') + (days && hours ? ' ' : '') + (hours ? hours + 'h' : '')
    // const formatedTime = (days ? (days + (days > 1 ? " days" : " day")): "")
    //      + (days && hours ? " and " : "")
    //      + (hours ? (hours + (hours > 1 ? " hours" : " hour")): "")
    return formatedTime

}

const Results = ({data}) => {

    // Récupération des données saisies par l'utilisateur
    const worldLevel = data.worldLevel
    const actualLevel = data.actualLevel
    const isAscended = data.isAscended || false
    const targetLevel = data.targetLevel
    const moraPossessed = data.moras
    const materialPossessed = data.materials
    const bookPossessed = data.books
    const primogemRefill = data.primogemRefill

    // Récupération des données par rapport au niveau de monde sélectionné
    const worldLevelDetails = calculate.worldLevelDetails(worldLevel)

    // Récupération des données d'ascension par rapport au niveau actuel et cible
    const ascensionDetails = calculate.ascensionDetails(actualLevel, targetLevel, isAscended)

    // Calculs de la résine utilisable par jour et de son coût en primogem
    const naturalResinPerDay = calculate.naturalResinPerDay()
    const primogemResinPerDay = calculate.primogemResinPerDay(primogemRefill)
    const primogemCostPerDay = calculate.primogemCost(primogemRefill)
    const totalResinPerDay = calculate.totalResinPerDay(naturalResinPerDay, primogemResinPerDay)

    // Calculs relatifs à l'expérience nécessaire
    const expCost = calculate.expCost(actualLevel, targetLevel)
    const expFromPossessedBooks = calculate.possessedBookExp(bookPossessed)
    const expRequired = calculate.expRequired(expFromPossessedBooks, expCost)
    const expRun = calculate.leyLineRun('exp', expRequired, worldLevelDetails)
    const expResinCost = calculate.resinCost('exp', expRun)
    const expTimeCost = calculate.timeCost(expResinCost, totalResinPerDay)

    // Calculs relatifs aux moras nécessaires
    const expMoraCost = calculate.expMoraCost(expCost)
    const moraCostAscension = calculate.ascensionMoraCost(ascensionDetails)
    const moraCostTotal = calculate.totalMoraCost(expMoraCost, moraCostAscension)
    const moraRequired = calculate.moraRequired(moraCostTotal, moraPossessed)
    const moraRun = calculate.leyLineRun('mora', moraRequired, worldLevelDetails)
    const moraResinCost = calculate.resinCost('mora', moraRun)
    const moraTimeCost = calculate.timeCost(moraResinCost, totalResinPerDay)

    // Calculs relatifs aux matériaux nécessaires
    const ascensionMaterialCost = calculate.ascensionMaterialCost(ascensionDetails, materialPossessed)
    const bossRun = calculate.bossRun(worldLevelDetails, ascensionMaterialCost)
    const bossResinCost = calculate.resinCost('boss', bossRun)
    const bossTimeCost = calculate.timeCost(bossResinCost, totalResinPerDay)



    // Calculs par rapport aux coût totaux de résine,temps et primogems
    const resinCostTotal = calculate.resinCostTotal(moraResinCost,expResinCost,bossResinCost)
    const timeCostTotal = calculate.timeCostTotal(moraTimeCost,expTimeCost,bossTimeCost)
    const primogemCostTotal = calculate.primogemCostTotal(primogemCostPerDay,timeCostTotal)

    
    
    

    return (
        <div className='result'>
            <div className='result-total'>
                <div className='result-item yellow'>
                    <h4>Moras Required</h4>
                    <p>{formatNumber(moraRequired, ' ')}<Icon iconName="mora"/></p>
                    <p>{moraRun} <Icon iconName='redo'/></p>
                    <p>{moraResinCost}<Icon iconName="resin"/></p>
                    <p>{formatTime(moraTimeCost)}</p>
                </div>
                <div className='result-item green'>
                    <h4>Books Required</h4>
                    <p>{Math.ceil(expRequired / 20000)}<Icon iconName='expBook'/></p>
                    <p>{expRun} <Icon iconName='redo'/></p>
                    <p>{expResinCost}<Icon iconName="resin"/></p>
                    <p>{formatTime(expTimeCost)}</p>
                </div>
                <div className='result-item blue'>
                    <h4>Materials Required</h4>
                    <p>
                    <MaterialRequired materialsRequired={ascensionMaterialCost}/>
                    </p>
                    <p>{bossRun} <Icon iconName='redo'/></p>
                    <p>{bossResinCost}<Icon iconName="resin"/></p>
                    <p>{formatTime(bossTimeCost)}</p>
                </div>
                <div className='result-item purple'>
                    <h4>Total Cost</h4>
                    <p>Resin : {resinCostTotal}<Icon iconName='resin'/> </p>
                    <p>
                        Time : {formatTime(timeCostTotal)}
                    </p>
                    <p>
                        Primogems : {primogemCostTotal}<Icon iconName='primogem'/>
                    </p>
                    <span>({primogemCostPerDay}<Icon iconName='primogem'/> /days)</span>
                </div>
            </div>
            <div className='result-item2'>
                <div className='result-item-img'>
                    <img  src={mora}/>
                </div>
                <div className='result-item-farm'>
                    <div>{shortNumber(moraRequired)}</div>
                    <div>{moraRun}</div>
                    <div>{moraResinCost}</div>
                    <div>{formatTime(moraTimeCost)}</div>
                </div>
            </div>
            <div className='result-item2'>
                <div className='result-item-img'>
                    <img  src={expBook}/>
                </div>
                <div className='result-item-farm'>
                    <div>~ {Math.ceil(expRequired / 20000)}</div>
                    <div>{expRun}</div>
                    <div>{expResinCost}</div>
                    <div>{formatTime(expTimeCost)}</div>
                </div>
            </div>
        </div>
    )
}

export default Results