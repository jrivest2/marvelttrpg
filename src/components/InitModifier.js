import { useState } from "react";

function InitModifier({character}) {
    let initModifier = character.vigilance;
    let initEdge = "";

    const initPowerValues = {
      "Spider-Sense": null,
    }
    const initTraitValues = {
        "Situational Awareness": null,
    }


    Object.entries(character.powers).forEach((powerSet) => {
    const [set, powers] = powerSet;
        powers.forEach((power) => {
            if (power in initPowerValues) {
                initEdge = "E";
            }
        });
    });

    character.traits.forEach((trait) => {
                
        if (trait in initTraitValues) {
            initEdge = "E";
        }
    });
   

    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    if (isClicked) {
        return (
            <div>
                <div className="subtitle" onClick={handleClick}>Initiative Modifier: +{initModifier} {initEdge}</div>
                <hr></hr>
                <div>A character's <i>Initiative Modifier</i> helps determine when they can act during combat. The higher the number, the more likely they are to go first.</div>
                <div>A character's Initiative Modifier is equal to their Vigilance. If there's an E next to a character's Initiative Modifier, that means they have an edge on their initiative checks.</div>
                <br></br>
                <div><b>Example</b></div>
                <div><i>Spider-Man's Vigilance is 3, so his Initiative Modifier is +3 by default; however, Spider-Man also has a power called "Spider-Sense" that gives him an edge on initiative checks. So his Initiative modifier is +3 E</i></div>
                <hr></hr>
            </div>
        );
    }



    return <h3 className="subtitle" onClick={handleClick}>Initiative Modifier: +{initModifier} {initEdge}</h3>
};

export default InitModifier;