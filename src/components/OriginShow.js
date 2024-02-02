import originStats from '../origins.json';
import ClickRule from './ClickRule';

function OriginShow ({origin}) {
 
    origin = originStats.filter(entry => entry.name == origin)[0]

    
    const outputStats = Object.entries(origin).map((stat, index) => {
        if ((stat[0] == "tags" || stat[0] == "traits" || stat[0] == "powers") && stat[1].length > 1) {
            let outputString = ""
            stat[1].map((traitTag) => {outputString += traitTag + ", "})
            outputString = outputString.substring(0, outputString.length - 2)
            return <div key={index}>{stat[0].toUpperCase()}: {outputString}</div>

        }
        if (stat[1].length > 0 && stat[0] != "name" && stat[0] != "description") return <div key={index}>{stat[0].toUpperCase()}: {stat[1]}</div>
    });
    
    const clickBody = (
        <div>
            <div><b>Origin: {origin.name}</b></div>
            <div>{origin.description}</div>
            <div>{outputStats}</div>
        </div>
    );

    return <ClickRule rule={origin.name} children={clickBody} />
}

export default OriginShow;