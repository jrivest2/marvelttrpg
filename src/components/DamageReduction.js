function DamageReduction({character}) {
    let hDamageReduction = 0;
    let fDamageReduction = 0;
    let powerValues = {
        "Sturdy 1": () => {hDamageReduction = 1},
        "Sturdy 2": () => {hDamageReduction = 2},
        "Sturdy 3": () => {hDamageReduction = 3},
        "Sturdy 4": () => {hDamageReduction = 4},
        "Uncanny 1": () => {fDamageReduction = 1},
        "Uncanny 2": () => {fDamageReduction = 2},
        "Uncanny 3": () => {fDamageReduction = 3},
        "Uncanny 4": () => {fDamageReduction = 4},
        "Reinforced Skeleton": () => {hDamageReduction = 1}

    }
    Object.entries(character.powers).forEach((powerSet) => {
        const [set, powers] = powerSet;
        powers.forEach((power) => {
            if (power in powerValues) {
                let func = powerValues[power]
                func();
            }
        })
    })

    return (
        <div>
            <div>Health Damage Reduction: -{hDamageReduction}</div>
            <div>Focus Damage Reduction: -{fDamageReduction}</div>
        </div>
    );
};

export default DamageReduction;