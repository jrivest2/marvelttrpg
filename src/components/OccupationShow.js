import occupationRules from '../occupations.json';
import ClickRule from './ClickRule';

function OccupationShow({occupation}) {

    occupation = occupationRules.filter(item => item.name == occupation)[0]

    let outputStats = Object.entries(occupation).map((stat, index) => {
        
        if ((stat[0] == "tags" || stat[0] == "traits" || stat[0] == "powers") && stat[1].length > 1) {
            
            let outputString = ""
            stat[1].map((traitTag) => {outputString += traitTag + ", "})
            outputString = outputString.substring(0, outputString.length - 2)
            return <div key={index}>{stat[0].toUpperCase()}: {outputString}</div>
            
        }
        
        if (stat[1].length > 0 && stat[0] != "name" && stat[0] != "description") return <div key={index}>{stat[0].toUpperCase()}: {stat[1]}</div>
        
    })
    
    const clickBody = (
        <div>
            <div><b>Occupation: {occupation.name}</b></div>
            <div>{occupation.description}</div>
            <div>{outputStats}</div>
        </div>
    );

    return <ClickRule rule={occupation.name} children={clickBody} />
}

export default OccupationShow;