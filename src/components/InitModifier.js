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
   
    return <h3 className="subtitle">Initiative Modifier: +{initModifier} {initEdge}</h3>
};

export default InitModifier;