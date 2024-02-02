import ClickRuleSplitTitle from "./ClickRuleSplitTitle";

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
    
    const clickBody = (
        <div>
            <div><b>Damage Reduction</b></div>
            <div>Some powers and equipment grant damage reduction. This is expressed by a number, like Damage Reduction 2.</div>
            <div>When calculating damage that an attack does to someone with damage reduction, reduce the damage multiplier by the amount of damage reduction. If the damage multiplier is reduced to less than 1, the attack does no damage at all, not even from the attacker's Ability score bonus.</div>
            <div>If the attack gets a result that increases the damage multiplier, apply the damage reduction before figuring the increase.</div>
            <div>As with damage multipliers, things that grant damage reduction bonuses <b>do not stack</b>. This means that they do not add together. If you have two or more instances of damage reduction that could apply in a situation, the largest one takes effect, and the others do not.</div>
            <br></br>
            <div><b>Example</b></div>
            <div><i>Spider-Man (Miles Morales) punches Iron Man (Tony Stark) and hits. Spider-Man's Melee damage is (dMarvel*4)+3. Iron Man's Armor gives him Sturdy 2, which reduces the damage multiplier by 2, so the damage that gets through from a successful punch is (dMarvel*2)+3 instead.</i></div>
            <div><i>Spider-Man takes another shot at Iron Man and gets a Fantastic success. This makes his damage 2*((dMarvel*2)+3) (which evaluates to (dMarvel*4)+6) instead.</i></div>
            <div><i>Iron Man switches over to his Hulkbuster armor, which grants him Sturdy 4. Spider-Man hits him again, but this time, the Armor reduces his attack multiplier to 0, so the punch does no damage at all.</i></div>
        </div>
    );

    return (
        <div className="subtitle">
            <ClickRuleSplitTitle rule={[<text>Health Damage Reduction</text>, <text>-{hDamageReduction}</text>]} children={clickBody} />
            <ClickRuleSplitTitle rule={[<text>Focus Damage Reduction</text>, <text>-{fDamageReduction}</text>]} children={clickBody} />
        </div>
    );
};

export default DamageReduction;