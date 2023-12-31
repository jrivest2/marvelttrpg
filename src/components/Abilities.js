function Abilities({character}) {
    
  let melee = character.melee;
  let agility = character.agility;
  let resilience = character.resilience;
  let vigilance = character.vigilance;
  let ego = character.ego;
  let logic = character.logic;


  let mDefense = melee + 10;
  let aDefense = agility + 10;
  let rDefense = resilience + 10;
  let vDefense = vigilance + 10;
  let eDefense = ego + 10;
  let lDefense = logic + 10;

  let mNonCombat = melee;
  let aNonCombat = agility;
  let rNonCombat = resilience;
  let vNonCombat = vigilance;
  let eNonCombat = ego;
  let lNonCombat = logic;

  let hasEvasion = false;
  let hasIntegrity = false;
  let hasBrawling = false;

  function addMelee(value) { mNonCombat += value };
  function addAgility(value) {aNonCombat += value };
  function addEgo(value) {eNonCombat += value };
  function addLogic(value)  {lNonCombat += value };

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
    "Brilliance 4": () => addLogic(4),
    "Spider-Sense": () => {aDefense += 2},
    "Evasion": () => {hasEvasion = true},
    "Integrity": () => {hasIntegrity = true},
    "Brawling": () => {hasBrawling = true}
  
  }



  Object.entries(character.powers).forEach((powerSet) => {
    const [set, powers] = powerSet;
    powers.forEach((power) => {
        
        if (power in powerValues) {
            let func = powerValues[power];
            func();
        }
    });

  });

  // Ability Check Edge Logic
    
  let meleeEdge = "";
  let agilityEdge = "";
  let resilienceEdge = "";
  let vigilanceEdge = "";
  let egoEdge = "";
  let logicEdge = "";

  const statPowers = {
    "Additional Limb": () => {meleeEdge = "E"; agilityEdge = "E"},
  }
  const statTraits = {
    "Big (Reach 2)": () => { mDefense--; aDefense--}
  }

  character.traits.forEach((trait) => {
                
      if (trait in statTraits) {
        let func = statTraits[trait]
        func();
      }
  });

  Object.entries(character.powers).forEach((powerSet) => {
  const [set, powers] = powerSet;
      powers.forEach((power) => {
        if (power in statPowers) {
          let func = statPowers[power]
          func();
        }
      });
  });
    
    //If character has Evasion, Integrity, or Brawling, do the effect at the last second
    if (hasEvasion && aDefense > mDefense) mDefense = aDefense;
    if (hasIntegrity && lDefense > eDefense) eDefense = lDefense;
    if (hasBrawling && mDefense > aDefense) aDefense = mDefense;
    
    return (
        <div id='ability-stats'>
        <div className="subtitle"><b>ABILITIES</b></div>
        <h2><b>Melee</b>: {melee} {meleeEdge}</h2>
        <div>Melee Defense: {mDefense}</div>
        <p>Melee Non-Combat: +{mNonCombat} {meleeEdge}</p>
        
        <h2><b>Agility</b>: {agility} {agilityEdge}</h2>
        <div>Agility Defense: {aDefense}</div>
        <p>Agility Non-Combat: +{aNonCombat} {agilityEdge}</p>
        
        <h2><b>Resilience</b>: {resilience} {resilienceEdge}</h2>
        <div>Resilience Defense: {rDefense}</div>
        <p>Resilience Non-Combat: +{rNonCombat} {resilienceEdge}</p>
        
        <h2><b>Vigilance</b>: {vigilance} {vigilanceEdge}</h2>
        <div>Vigilance Defense: {vDefense}</div>
        <p>Vigilance Non-Combat: +{vNonCombat} {vigilanceEdge}</p>
        
        <h2><b>Ego</b>: {ego} {egoEdge}</h2>
        <div>Ego Defense: {eDefense}</div>
        <p>Ego Non-Combat: +{eNonCombat} {egoEdge}</p>
        
        <h2><b>Logic</b>: {logic} {logicEdge}</h2>
        <div>Logic Defense: {lDefense}</div>
        <p>Logic Non-Combat: +{lNonCombat} {logicEdge}</p>
      </div>

    );
}

export default Abilities;