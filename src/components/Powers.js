import PowerShow from "./PowerShow";
import powersFile from '../powerRules.json';


function Powers({character}) {
    
    let outputPowers = [];
    let numSets = 0;
    Object.entries(character.powers).forEach((powerSet) => {
        const [set, powers] = powerSet;
        numSets++;
        outputPowers = [...outputPowers, <div key={outputPowers.length}><b>{set + ":"}</b></div>];
        const nextSet = powers.map((power, index) => {

            if (typeof(power) == "object") {
                console.log(power)
                let [powerName, subPower] = power 
                power = powersFile.filter(entry => entry.name == power[0])[0]

                return <PowerShow power={power} key={index} subPower={subPower} />
            }
            else {
                power = powersFile.filter(entry => entry.name == power)[0]
                return <PowerShow power={power} key={index} />
            }
            
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