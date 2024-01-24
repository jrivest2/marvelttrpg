import PowerRuleShow from './PowerRuleShow';
import ClickRule from './ClickRule';

function PowerShow({power, subPower}) {

    const ruleClass = "powerRule";
    const powerClass = "power";
    let powerName = <text className={powerClass}>{power.name}</text>;
    
    if (subPower) {
        if (typeof(subPower) == "object") {
                powerName = (<text className={powerClass}>{power.name}: {subPower[0]}</text>);
                return <ClickRule rule={powerName} classRule={ruleClass} children={<PowerRuleShow power={power} subPower={subPower} />} />
        }
        powerName = <text className={powerClass}>{power.name}: {subPower}</text>
        return <ClickRule rule={powerName} classRule={ruleClass}  children={<PowerRuleShow power={power} subPower={subPower} />}/>
    } 
    return <ClickRule rule={powerName} classRule={ruleClass} children={<PowerRuleShow power={power} />} />

};

export default PowerShow;