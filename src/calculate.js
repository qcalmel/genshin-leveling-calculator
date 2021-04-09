import {expByLvl} from "./data/expByLvl";
import {gameConst} from "./data/gameConst";
import {ascensionCost} from "./data/ascensionCost";
import {worldLevelInfos} from "./data/worldLevel";
import {books} from "./data/books";

const calculate = {

    /**
     *
     * @param worldLevel
     * @returns {{}}
     */
    worldLevelDetails: (worldLevel) => (
        worldLevelInfos.find((worldLevelDetails) => worldLevelDetails.worldLevel === worldLevel)
    ),

    /**
     *
     * @param actualLevel : number
     * @param targetLevel : number
     * @returns {number}
     */
    expCost: (actualLevel, targetLevel) => {
        const getTotalExp = (level) => {
            const levelDetails = expByLvl.find(levelDetails => levelDetails.Level === level)
            return levelDetails['TotalExp']
        }
        const actualExp = getTotalExp(actualLevel)
        const targetExp = getTotalExp(targetLevel)
        const requiredExp = targetExp - actualExp

        return requiredExp < 0 ? 0 : requiredExp
    },

    /**
     *
     * @param exp : number
     * @returns {number}
     */
    expMoraCost: (exp) => (
        exp * gameConst.moraCostbyEXp
    ),

    /**
     *
     * @param actualLevel : number
     * @param targetLevel : number
     * @param isAscended : boolean
     * @returns {{}}
     */
    ascensionDetails: (actualLevel, targetLevel, isAscended) => {
        const actualLevelAscensionDetails = ascensionCost.find((ascensionDetails) => {
            return ascensionDetails.minLvl <= (isAscended ? actualLevel + 1 : actualLevel)
                && (ascensionDetails.maxLvl >= (isAscended ? actualLevel + 1 : actualLevel))
        })
        const targetLevelAscensionDetails = ascensionCost.find((ascensionDetails) => {
            return (ascensionDetails.minLvl >= actualLevel)
                && (ascensionDetails.maxLvl >= targetLevel)
        })
        return {actualLevel: actualLevelAscensionDetails, targetLevel: targetLevelAscensionDetails}
    },

    /**
     *
     * @param ascensionDetails
     * @returns {number}
     */
    ascensionMoraCost: (ascensionDetails) => (
        ascensionDetails.targetLevel.moraCost - ascensionDetails.actualLevel.moraCost
    ),

    /**
     *
     * @param ascensionDetails
     * @param ascensionMaterialPossessed
     * @returns {{}}
     */
    ascensionMaterialCost: (ascensionDetails, ascensionMaterialPossessed) => {
        const actualLvlAscensionMaterial = ascensionDetails.actualLevel.ascensionMaterialRequired
        const targetlLvlAscensionMaterial = ascensionDetails.targetLevel.ascensionMaterialRequired
        const ascensionMaterialCost = Object.keys(targetlLvlAscensionMaterial)
            .reduce((requiredMaterials, material) => {
                requiredMaterials[material] = targetlLvlAscensionMaterial[material]
                    - actualLvlAscensionMaterial[material]
                    - ascensionMaterialPossessed[material]
                return requiredMaterials
            }, {})
        return ascensionMaterialCost
    },

    /**
     *
     * @param xpMoraCost : number
     * @param ascensionMoraCost : number
     * @returns {number}
     */
    totalMoraCost: (xpMoraCost, ascensionMoraCost) => (
        xpMoraCost + ascensionMoraCost
    ),

    moraRequired: (totalMoraCost, moraPossessed) => {
        const moraRequired = totalMoraCost - moraPossessed
        return moraRequired > 0 ? moraRequired : 0
    },

    /**
     *
     * @returns {number}
     */
    naturalResinPerDay: () => (
        (24 * 60) / gameConst.refill.time * gameConst.refill.amount
    ),

    /**
     *
     * @param refillPerDay : number
     * @returns {number}
     */

    /**
     *
     * @param moraTimeCost : number
     * @param expTimeCost : number
     * @param bossTimeCost : number
     * @returns {number}
     */
    timeCostTotal : (moraTimeCost,expTimeCost,bossTimeCost) => moraTimeCost + expTimeCost +bossTimeCost,

    primogemResinPerDay: (refillPerDay) => (
        gameConst.primogemRefill.amount * refillPerDay
    ),

    /**
     *
     * @param refillPerDay : number
     * @returns {number}
     */
    primogemCost: (refillPerDay) => (
        gameConst.primogemRefill.cost[refillPerDay]
    ),

    /**
     *
     * @param primogemCost : number
     * @param timeCostTotal : number
     * @returns {number}
     */
    primogemCostTotal : (primogemCost, timeCostTotal) => primogemCost * Math.ceil(timeCostTotal),

    resinCostTotal : (moraResinCost,expResinCost,bossResinCost) => moraResinCost + expResinCost + bossResinCost,

    /**
     *
     * @param naturalResinPerDay : number
     * @param primogemResinPerDay : number
     * @returns {number}
     */
    totalResinPerDay: (naturalResinPerDay, primogemResinPerDay) => (
        naturalResinPerDay + primogemResinPerDay
    ),

    /**
     *
     * @param ressourceType : string
     * @param ressourceAmount : number
     * @param worldLevelDetails : {}
     * @returns {number}
     */
    leyLineRun: (ressourceType, ressourceAmount, worldLevelDetails) => {
        const leyLineReward = ressourceType === 'exp' ? worldLevelDetails.leyLineXp : worldLevelDetails.leyLineMora
        return Math.ceil(ressourceAmount / leyLineReward)
    },

    /**
     *
     * @param worldLevelDetails : {}
     * @param ascensionMaterialCost : {}
     * @returns {number}
     */
    bossRun: (worldLevelDetails, ascensionMaterialCost) => {
        const dropRates = worldLevelDetails.ascensionMaterialDrop
        let isEnough = false
        let totalMaterialEarned = Object.keys(ascensionMaterialCost).reduce((acc, material) => {
            return {...acc, [material]: 0}
        }, {})
        let count = 0
        while (!isEnough) {
            let canCraft = false
            let canStop = true
            for (let material in totalMaterialEarned) {
                if (canCraft) {
                    totalMaterialEarned[material] += 1
                    canCraft = false
                }
                if ((material !== Object.keys(totalMaterialEarned)[0]) && totalMaterialEarned[material] >= (ascensionMaterialCost[material] + 3)) {
                    totalMaterialEarned[material] -= 3
                    canCraft = true
                }
                if (totalMaterialEarned[material] < ascensionMaterialCost[material]) {
                    canStop = false
                }
                isEnough = canStop
            }
            if (!isEnough) {
                for (const material of Object.keys(ascensionMaterialCost)) {
                    totalMaterialEarned[material] = Math.round((totalMaterialEarned[material] + (dropRates[material] || 0)) * 100) / 100
                }
                count++
            }
        }
        return count
    },

    /**
     *
     * @param ressourceType : string
     * @param run : number
     * @returns {number}
     */
    resinCost: (ressourceType, run) => {
        const eventResinCost = ressourceType !== 'boss' ? gameConst.leyLineCost : gameConst.bossCost
        return run * eventResinCost
    },

    /**
     *
     * @param resinCost
     * @param totalResinPerDay
     * @returns {number}
     */
    timeCost: (resinCost, totalResinPerDay) => {
        // const days = Math.floor(resinCost / totalResinPerDay )
        // const hours = Math.ceil(((resinCost / totalResinPerDay) % 1) * 24)
        // return days + "days" + " " + hours + "hours"
        return (resinCost / totalResinPerDay)
    },

    /**
     *
     * @param possessedBooks
     * @returns {number}
     */
    possessedBookExp: (possessedBooks) => {
        let totalBookExp = 0
        for (const [book,qty] of Object.entries(possessedBooks)) {
            const bookDetails = books.find(bookDetails => bookDetails.id === book)
            totalBookExp += bookDetails.exp * qty
        }
        return totalBookExp
    },

    /**
     *
     * @param possessedBookXp
     * @param expCost
     * @returns {number}
     */
    expRequired: (possessedBookXp,expCost) => ((expCost - possessedBookXp) > 0 ? expCost - possessedBookXp : 0 )

}

export default calculate

