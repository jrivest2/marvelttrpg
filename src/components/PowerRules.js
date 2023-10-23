import powers from '../powerRules.json';
import PowerRuleShow from './PowerRuleShow';

function PowerRules({character}) {
    
    // If you update searchTerm, make sure to change the if statement to match.
    let searchTerm = "Permanent";
    let searchStat = "duration";
    let searchPowers = [];
    let outputPowers = powers.map((power, index) => {
        if (power[searchStat] == searchTerm && !power.integrated) {
            searchPowers = [...searchPowers, <PowerRuleShow power={power} key={index} />]
        }
        return <PowerRuleShow power={power} key={index} />
    })

    // Possibly a different way to calclute searchPowers
    // searchPowers = powers.filter(power => power[searchStat] == searchTerm)
    

    console.log(powers.length)
    return (
        <div>
            <div>Power Rules: {searchTerm}</div>
            <div>{searchPowers}</div>
        </div>
    );

};

export default PowerRules;