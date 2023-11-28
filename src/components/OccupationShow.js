import occupationRules from '../occupations.json';
import { useState } from 'react';

function OccupationShow({occupation}) {

    const [isClicked, setIsClicked] = useState(false);

    occupation = occupationRules.filter(item => item.name == occupation)[0]

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    if (isClicked) {
        let outputStats = Object.entries(occupation).map((stat, index) => {
            
            if ((stat[0] == "tags" || stat[0] == "traits" || stat[0] == "powers") && stat[1].length > 1) {
                
                let outputString = ""
                stat[1].map((traitTag) => {outputString += traitTag + ", "})
                outputString = outputString.substring(0, outputString.length - 2)
                return <div key={index}>{stat[0].toUpperCase()}: {outputString}</div>
                
            }
            
            if (stat[1].length > 0 && stat[0] != "name" && stat[0] != "description") return <div key={index}>{stat[0].toUpperCase()}: {stat[1]}</div>
            
        })
        return (
            <div>
                <div onClick={handleClick}>{occupation.name}</div>
                <hr></hr>
                <div><b>Occupation: {occupation.name}</b></div>
                <div>{occupation.description}</div>
                <div>{outputStats}</div>
                <hr></hr>
            </div>
        );
    }    

    return <div onClick={handleClick}>{occupation.name}</div>
}

export default OccupationShow;