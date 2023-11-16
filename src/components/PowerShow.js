import {useState} from 'react';
import PowerRuleShow from './PowerRuleShow';

function PowerShow({power, subPower}) {

    let [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    if (isClicked) {
        if (subPower) {
            if (typeof(subPower) == "object") {
                return (
                    <div>
                        <div onClick={handleClick}>{power.name}: {subPower[0]}</div>
                        <hr></hr>
                        <PowerRuleShow power={power} subPower={subPower} />
                        <hr></hr>
                    </div>
                );
            }
            return (
                <div>
                    <div onClick={handleClick}>{power.name}: {subPower}</div>
                    <hr></hr>
                    <PowerRuleShow power={power} subPower={subPower} />
                    <hr></hr>
                </div>
            );
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

    if (subPower) {
        if (typeof(subPower) == "object") { return <div onClick={handleClick}>{power.name}: {subPower[0]}</div>}
        return <div onClick={handleClick}>{power.name}: {subPower}</div>
    }
    return <div onClick={handleClick}>{power.name}</div>

};

export default PowerShow;