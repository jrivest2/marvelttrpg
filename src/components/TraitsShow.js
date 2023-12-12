import traitRules from "../traits.json";
import { useState } from "react";


function TraitsShow({ trait }) {

    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }



    if (isClicked) {
        if (typeof(trait) == "object") {
            
            let traitStats = traitRules.filter(entry => entry.name == trait[0])[0]
            let traitStatsOutput = Object.entries(traitStats).map((stat, index) => {
                let [name, rule] = stat
                if (name == "name") return <div key={index}><b>{rule}</b></div>
                if (name == "description") return <div key={index}>{rule}</div>
                if (name == "integrated") {
                    switch(rule[0]) {
                        case 2:
                            return <div key={index}><br></br>This trait's effects have been <b>COMPLETELY</b> integrated into the website. No need for additional math.</div>
                        case 1:
                            return <div key={index}><br></br>This trait's effects have been <b>PARTIALLY</b> integrated into the website. {rule[1]}</div>
                        default:
                            return <div key={index}><br></br>This trait's effects have <b>NOT</b> been integrated into the website. You will have to keep track of it's effects on your own.</div>
                    }
                }

                if (rule.length > 0) return <div key={index}>{name.toUpperCase()}: {rule}</div>
            });


            if (typeof(trait[1]) == "object") {
                let outputString = ""
                trait[1].forEach(element => {
                    outputString += element + ", "
                });
                outputString = outputString.slice(0,-2)

                return (
                    <div>
                        <div onClick={handleClick}>{trait[0]}<sup className="clickScript">i</sup>: {outputString}</div>
                        <hr></hr>
                        <div>{traitStatsOutput}</div>
                        <hr></hr>
                    </div>
                );
            }

            return (
                <div>
                    <div onClick={handleClick}>{trait[0]}<sup className="clickScript">i</sup>: {trait[1]}</div>
                    <hr></hr>
                    <div>{traitStatsOutput}</div>
                    <hr></hr>
                </div>
            );

        }
        
        let traitStats = traitRules.filter(entry => entry.name == trait)[0]
        let traitStatsOutput = Object.entries(traitStats).map((stat, index) => {
            let [name, rule] = stat
            if (name == "name") return <div key={index}><b>{rule}</b></div>
            if (name == "description") return <div key={index}>{rule}</div>
            if (name == "integrated") {
                switch(rule[0]) {
                    case 2:
                        return <div key={index}><br></br>This trait's effects have been <b>COMPLETELY</b> integrated into the website. No need for additional math.</div>
                    case 1:
                        return <div key={index}><br></br>This trait's effects have been <b>PARTIALLY</b> integrated into the website. {rule[1]}</div>
                    default:
                        return <div key={index}><br></br>This trait's effects have <b>NOT</b> been integrated into the website. You will have to keep track of it's effects on your own.</div>
                }
            }

            if (rule.length > 0) return <div key={index}>{name.toUpperCase()}: {rule}</div>
        });

        return (
            <div>
                <div onClick={handleClick}>{trait}<sup className="clickScript">i</sup></div>
                <hr></hr>
                <div>{traitStatsOutput}</div>
                <hr></hr>
            </div>
        );

    }

    

    if (typeof(trait) == "object") {
        if (typeof(trait[1]) == "object") {
            let outputString = ""
            trait[1].forEach(element => {
                outputString += element + ", "
            });
            outputString = outputString.slice(0,-2)
            return <div onClick={handleClick}>{trait[0]}<sup className="clickScript">i</sup>: {outputString}</div>
        }
        return <div onClick={handleClick}>{trait[0]}<sup className="clickScript">i</sup>: {trait[1]}</div>
    }





    return <div onClick={handleClick}>{trait}<sup className="clickScript">i</sup></div>
}

export default TraitsShow;