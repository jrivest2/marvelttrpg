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
                        <div className={"power"} onClick={handleClick}>{power.name}: {subPower[0]}<sup className="clickScript">i</sup></div>
                        <hr></hr>
                        <PowerRuleShow power={power} subPower={subPower} />
                        <hr></hr>
                    </div>
                );
            }
            return (
                <div>
                    <div className={"power"} onClick={handleClick}>{power.name}: {subPower}<sup className="clickScript">i</sup></div>
                    <hr></hr>
                    <PowerRuleShow power={power} subPower={subPower} />
                    <hr></hr>
                </div>
            );
        }
        return (
            <div>
                <div className={"power"} onClick={handleClick}>{power.name}<sup className="clickScript">i</sup></div>
                <hr></hr>
                <PowerRuleShow power={power} />
                <hr></hr>
            </div>
        )
    }

    if (subPower) {
        if (typeof(subPower) == "object") { return <div onClick={handleClick}>{power.name}: {subPower[0]}<sup className="clickScript">i</sup></div>}
        return <div onClick={handleClick}>{power.name}: {subPower}<sup className="clickScript">i</sup></div>
    }
    return <div className={"power"} onClick={handleClick}>{power.name}<sup className="clickScript">i</sup></div>

};

export default PowerShow;