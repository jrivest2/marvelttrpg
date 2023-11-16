function Damage({character}) {

    let standardDmgMultiplier = character.rank;
    let mDmgMultiplier = standardDmgMultiplier;
    let aDmgMultiplier = standardDmgMultiplier;
    let eDmgMultiplier = standardDmgMultiplier;
    let lDmgMultiplier = standardDmgMultiplier;
    
    function addMelee(value) { mDmgMultiplier += value };
    function addAgility(value) {aDmgMultiplier += value };
    function addEgo(value) {eDmgMultiplier += value }
    function addLogic(value)  {lDmgMultiplier += value }
 
    const powerValues = {
      "Mighty 1": () => addMelee(1),
      "Mighty 2": () => addMelee(2),
      "Mighty 3": () => addMelee(3),
      "Mighty 4": () => addMelee(4),     
      "Accuracy 1": () => addAgility(1),
      "Accuracy 2": () => addAgility(2),
      "Accuracy 3": () => addAgility(3),
      "Accuracy 4": () => addAgility(4),
      "Discipline 1": () => addEgo(1),
      "Discipline 2": () => addEgo(2),
      "Discipline 3": () => addEgo(3),
      "Discipline 4": () => addEgo(4),
      "Brilliance 1": () => addLogic(1),
      "Brilliance 2": () => addLogic(2),
      "Brilliance 3": () => addLogic(3),
      "Brilliance 4": () => addLogic(4)
   
    }
    
    const iconicWeaponModifiers = {
      "+1 Melee Damage Multiplier": () => { if (1 + standardDmgMultiplier > mDmgMultiplier) {mDmgMultiplier = standardDmgMultiplier + 1}},
      "+1 Agility Damage Multiplier": () => { if (1 + standardDmgMultiplier > aDmgMultiplier) {aDmgMultiplier = standardDmgMultiplier + 1}},
    }

    let iconicWeaponIndex = null;
    if (character.hasIconicWeapon) {
      character.powers.Basic.forEach((power, index) => {
        if (power in powerValues) {
          let func = powerValues[power];
          func();
        }
        if (typeof(power) == "object") {
          if (power[0] == "Iconic Weapon") iconicWeaponIndex = index;
        }
      });
    } else {
      character.powers.Basic.forEach((power) => {
        if (power in powerValues) {
          let func = powerValues[power];
          func();
        }
      });
    }

    if (iconicWeaponIndex || iconicWeaponIndex == 0) {
      character.powers.Basic[iconicWeaponIndex][1][1].forEach((effect) => {
        if (effect in iconicWeaponModifiers) {
          let func = iconicWeaponModifiers[effect]
          func()
        }
      })
    }

    return (
        <div id='dmg-stats'>
        <h3><b>DAMAGE</b></h3>
        <h2>Melee: d616 * {mDmgMultiplier} + {character.melee}</h2>
        <h2>Agility: d616 * {aDmgMultiplier} + {character.agility}</h2>
        <h2>Ego: d616 * {eDmgMultiplier} + {character.ego}</h2>
        <h2>Logic: d616 * {lDmgMultiplier} + {character.logic}</h2>
      </div>
    );
}

export default Damage;