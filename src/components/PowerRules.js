import powers from '../powerRules.json';
import PowerRuleShow from './PowerRuleShow';

function PowerRules({character}) {
    
    // If you update searchTerm, make sure to change the if statement to match.
    let searchTerm = "Ranged Weapons";
    // let searchTerm = "Elemental Control";
    // let searchTerm = "Tactics";
    // let searchTerm = "Basic";
    let searchStat = "set";
    let searchPowers = [];
    let outputPowers = powers.map((power, index) => {
        // if (power[searchStat] === searchTerm && !power.integrated[0]) {
        if (power[searchStat].includes(searchTerm)) {
            searchPowers = [...searchPowers, <PowerRuleShow power={power} key={index} />]
        }
        return <PowerRuleShow power={power} key={index} />
    })

    // Possibly a different way to calclute searchPowers
    // searchPowers = powers.filter(power => power[searchStat] == searchTerm)
    

    console.log("Total Power Count:", powers.length)
    console.log("Search Power Count:", searchPowers.length)
    return (
        <div>
            <div>Power Rules:</div>
            <div>{searchStat}: {searchTerm}</div>
            <div>{searchPowers}</div>
        </div>
    );

};

export default PowerRules;