import PowerRuleShow from './PowerRuleShow';
import ClickRule from './ClickRule';

function PowerShow({power, subPower}) {

    const ruleClass = "powerRule";
    const powerClass = "power";

    let powerName = <text>{power.name}</text>;
    
    if (subPower) {
        if (typeof(subPower) == "object") {
                powerName = (<text>{power.name}: {subPower[0]}</text>);
                return <ClickRule rule={powerName} bodyClass={ruleClass} titleClass={powerClass} children={<PowerRuleShow power={power} subPower={subPower} />} />
        }
        powerName = <text>{power.name}: {subPower}</text>
        return <ClickRule rule={powerName} bodyClass={ruleClass} titleClass={powerClass} children={<PowerRuleShow power={power} subPower={subPower} />}/>
    } 
    return <ClickRule rule={powerName} bodyClass={ruleClass} titleClass={powerClass} children={<PowerRuleShow power={power} />} />

};

export default PowerShow;