import tagRules from "../tags.json"
import ClickRuleSplitTitle from "./ClickRuleSplitTitle";
import ClickRule from "./ClickRule";

function TagsShow({ tag }) {

    if (typeof(tag) == "object") {
        
        let tagStats = tagRules.filter(entry => entry.name == tag[0])[0]
        let tagStatsOutput = Object.entries(tagStats).map((stat, index) => {
            let [name, rule] = stat
            if (name == "name") return <div key={index}><b>{rule}</b></div>
            if (name == "description") return <div key={index}>{rule}</div>
            if (name == "integrated") {
                switch(rule[0]) {
                    case 2:
                        return <div key={index}><br></br>This tag's effects have been <b>COMPLETELY</b> integrated into the website. No need for additional math.</div>
                    case 1:
                        return <div key={index}><br></br>This tag's effects have been <b>PARTIALLY</b> integrated into the website. {rule[1]}</div>
                    default:
                        return <div key={index}><br></br>This tag's effects have <b>NOT</b> been integrated into the website. You will have to keep track of it's effects on your own.</div>
                }
            }

            if (rule.length > 0) return <div key={index}>{name.toUpperCase()}: {rule}</div>
        });


        if (typeof(tag[1]) == "object") {
            let outputString = ""
            tag[1].forEach(element => {
                outputString += element + ", "
            });
            outputString = outputString.slice(0,-2)

            return (
                <ClickRuleSplitTitle rule={[tag[0],outputString]} children={tagStatsOutput} titleClass={"trait-tag-rule"} bodyClass={"trait-tag-rule"} />
            );
        }

        return (
            <ClickRuleSplitTitle rule={[tag[0],tag[1]]} children={tagStatsOutput} titleClass={"trait-tag-rule"} bodyClass={"trait-tag-rule"} />
        );

    }
    
    let tagStats = tagRules.filter(entry => entry.name == tag)[0]
    let tagStatsOutput = Object.entries(tagStats).map((stat, index) => {
        let [name, rule] = stat
        if (name == "name") return <div key={index}><b>{rule}</b></div>
        if (name == "description") return <div key={index}>{rule}</div>
        if (name == "integrated") {
            switch(rule[0]) {
                case 2:
                    return <div key={index}><br></br>This tag's effects (if any) have been <b>COMPLETELY</b> integrated into the website. No need for additional math.</div>
                case 1:
                    return <div key={index}><br></br>This tag's effects (if any) have been <b>PARTIALLY</b> integrated into the website. {rule[1]}</div>
                default:
                    return <div key={index}><br></br>This tag's effects (if any) have <b>NOT</b> been integrated into the website. You will have to keep track of it's effects on your own.</div>
            }
        }

        if (rule.length > 0) return <div key={index}>{name.toUpperCase()}: {rule}</div>
    });

    return (
        <ClickRule rule={tag} children={tagStatsOutput} titleClass={"trait-tag-rule"} bodyClass={"trait-tag-rule"} />
    );
}

export default TagsShow;