import PowerShow from "./PowerShow";
import powersFile from '../powerRules.json';


function Powers({character}) {
    
    let outputPowers = [];
    let numSets = 0;
    Object.entries(character.powers).forEach((powerSet) => {
        const [set, powers] = powerSet;
        numSets++;
        outputPowers = [...outputPowers, <div key={outputPowers.length + 1}><b>{set + ":"}</b></div>];
        const nextSet = powers.map((power, index) => {
            // Uncomment the lines below when powersFile is complete
            power = powersFile.filter(entry => entry.name == power)
            if (power.length) return <PowerShow power={power[0]} key={index} />
            return <PowerShow power={power} key={index} />
        });
        outputPowers = [...outputPowers, nextSet];
    });
    numSets--;

    return (
        <div>
        <div><b>POWERS</b></div>
        {outputPowers}
       
        </div>
    );
}

export default Powers;