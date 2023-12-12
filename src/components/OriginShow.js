import originStats from '../origins.json';
import { useState } from 'react';

function OriginShow ({origin}) {

    const [isClicked, setIsClicked] = useState(false)

 
    origin = originStats.filter(entry => entry.name == origin)[0]

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    if (isClicked) {
        let outputStats = Object.entries(origin).map((stat, index) => {
            if ((stat[0] == "tags" || stat[0] == "traits" || stat[0] == "powers") && stat[1].length > 1) {
                let outputString = ""
                stat[1].map((traitTag) => {outputString += traitTag + ", "}) //<-- Expand this block to fix the sub trait/tag bug
                outputString = outputString.substring(0, outputString.length - 2)
                return <div key={index}>{stat[0].toUpperCase()}: {outputString}</div>

            }
            if (stat[1].length > 0 && stat[0] != "name" && stat[0] != "description") return <div key={index}>{stat[0].toUpperCase()}: {stat[1]}</div>
        });
        
        return (
            <div>
                <div onClick={handleClick}>{origin.name}<sup className="clickScript">i</sup></div>
                <hr></hr>
                <div><b>Origin: {origin.name}</b></div>
                <div>{origin.description}</div>
                <div>{outputStats}</div>
                <hr></hr>
            </div>
        );
    }


    return <div onClick={handleClick}>{origin.name}<sup className="clickScript">i</sup></div>;
}

export default OriginShow;