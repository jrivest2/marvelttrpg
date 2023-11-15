import {useState} from 'react';
import PowerRuleShow from './PowerRuleShow';

function PowerShow({power, subPower}) {

    let [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    // if (isClicked) {
    //     return (
    //         <div>
    //             <div onClick={handleClick}>{power}</div>
    //             <hr></hr>
    //             <div>INSERT {power}'S DETAILS HERE</div>
    //             <hr></hr>
    //         </div>
    //     )
    // }
    // return <div onClick={handleClick}>{power}</div>

    // Use the below code instead when powersFile/powerRules.JSON is complete

    if (isClicked) {
        if (subPower) {
            return (
                <div>
                    <div onClick={handleClick}>{power.name}: {subPower}</div>
                    <hr></hr>
                    <PowerRuleShow power={power} subPower={subPower} />
                    <hr></hr>
                </div>
            )
        }
        return (
            <div>
                <div onClick={handleClick}>{power.name}</div>
                <hr></hr>
                <PowerRuleShow power={power} />
                <hr></hr>
            </div>
        )
    }

    if (subPower) return <div onClick={handleClick}>{power.name}: {subPower}</div>
    return <div onClick={handleClick}>{power.name}</div>

};

export default PowerShow;