import SearchBarPre from "./SearchBarPre";
import { useState } from 'react';
import stats from '../characterSearch_prebuilt.json';
import Speed from './Speed';
import InitModifier from "./InitModifier";
import DamageReduction from "./DamageReduction";
import TextBox from "./TextBox";

function CharacterProfile({character, updateChar}) {
    
    let name = character.name;
    let rank = character.rank;
    
    let resilience = character.resilience;
    let vigilance = character.vigilance;
    
    let maxHealth = 0;
    let maxFocus = 0;

    if (resilience < 1) {maxHealth = 10;}
    else {maxHealth = 30 * resilience;}
    if (vigilance < 1) {maxFocus = 10;}
    else {maxFocus = 30 * vigilance;}

    const [health, setHealth] = useState(30 * resilience)
    const [focus, setFocus] = useState(30 * vigilance)
    
    
    const handleSubmit = (term) => {
      if (stats.filter(newChar => newChar.name.toLowerCase() == term.toLowerCase())[0]) {
        let newCharacter = stats.filter(newChar => newChar.name.toLowerCase() == term.toLowerCase())[0]
        updateChar(newCharacter)
        heroicKarma(newCharacter);
        setKarma(baseKarma)
        setHealth(30 * newCharacter.resilience)
        if (newCharacter.traits.includes("Battle Ready")) {
          traitFocus(newCharacter)
          resetFocus()
        } else setFocus(30 * newCharacter.vigilance)
      }
    };

    

    function handleHealthSubmit(val) {
      if ((-maxHealth) >= parseInt(val) + health)setHealth(-maxHealth)
      else if (maxHealth <= parseInt(val) + health) setHealth(maxHealth)
      else setHealth(health + parseInt(val))
    }

    function resetHealth() {
      setHealth(maxHealth);
    }

    function handleFocusSubmit(val) {
      if (-maxFocus > (parseInt(val) + focus)) setFocus(-maxFocus)  
      else if (maxFocus < parseInt(val) + focus) setFocus(maxFocus)
      else setFocus(focus + parseInt(val))
    }

    function resetFocus() {
      setFocus(maxFocus);
    }

    let baseKarma = 0;
    let tagValues = {
      "Heroic": (char) => { baseKarma = char.rank; },
    }

    let traitValues = {
      "Battle Ready": (char) => {maxFocus = 30 * char.vigilance + 30}
    }

    function heroicKarma(newcharacter) {
      baseKarma = 0;
      newcharacter.tags.forEach((tag) => {
        if (tag in tagValues) {
          let func = tagValues[tag];
          func(newcharacter);
        } 
      });
      
    }

    function traitFocus(newcharacter) {
      newcharacter.traits.forEach((trait) => {
        if (trait in traitValues) {
          let func = traitValues[trait];
          func(newcharacter);
        }
      });
    }
    
    const [karma, setKarma] = useState(baseKarma);

    const handleClickKarmaMinus = () => {
      if (karma > 0) setKarma(karma - 1);
    };
    const handleClickKarmaPlus = () => {
      setKarma(karma + 1);
    };

    const handleClickKarmaReset = () => {
      setKarma(baseKarma);
    }


    heroicKarma(character);
    character.traits.forEach((trait) => {
      if (trait in traitValues) {
        let func = traitValues[trait];
        func(character);
      }
    });

    const [isMaxHealthClicked, setIsMaxHealthClicked] = useState(false)
    const [isMaxFocusClicked, setIsMaxFocusClicked] = useState(false)

    const handleMaxHealthClick = () => {
      if (isMaxHealthClicked) setIsMaxHealthClicked(false)
      else setIsMaxHealthClicked(true)
    }

    const handleMaxFocusClick = () => {
      if (isMaxFocusClicked) setIsMaxFocusClicked(false)
      else setIsMaxFocusClicked(true)
    }

    let maxHealthOutput = <p onClick={handleMaxHealthClick}>Max Health: {maxHealth}</p>
    let maxFocusOutput = <p onClick={handleMaxFocusClick}>Max Focus: {maxFocus}</p>
    
    
    if (isMaxHealthClicked) {
      maxHealthOutput = (
      <div onClick={handleMaxHealthClick}>
        <div>Max Health: {maxHealth}</div>
        <hr></hr>
        <div>A character's <i>Health</i> measures their capacity to endure physical damage and keep fighting. It (Current Health) can be temporarily lowered by physical damage.</div>
        <div>To calculate a character's Health, muliply their Resilience by 30. The minimum is 10 Health (Max Health), even if the character's Resilience is less than 1.</div>
        <br></br>
        <div><b>Example</b></div>
        <div><i>Spider-Man's Resilience is 3. Multiply that by 30 to determine his Health, which is 90.</i></div>
        <hr></hr>
      </div>)
    }
    if (isMaxFocusClicked) {
      maxFocusOutput = (
      <div onClick={handleMaxFocusClick}>
        <div>Max Focus: {maxFocus}</div>
        <hr></hr>
        <div>A character's <i>Focus</i> represents their capacity for concentration and willpower. It (Current Focus) can be temporarily lowered by psychic damage or the use of certain powers.</div>
        <div>To calculate a character's Focus, muliply their Vigilance by 30. The minimum is 10 Focus (Max Focus), even if the character's Vigilance is less than 1.</div>
        <br></br>
        <div><b>Example</b></div>
        <div><i>Spider-Man's Vigilance is 3. Multiply that by 30 to determine his Focus, which is 90.</i></div>
        <hr></hr>
      </div>)
    }
    return (
      <section className='hero is-danger'>
        <div className='hero-body'>
          <h1>Character Sheet</h1>          
          <SearchBarPre onSubmit={handleSubmit} />
          <p className='title'>{name}</p>
          <p className='subtitle'>RANK: {rank}</p>
          <img src={ character.image } alt={"Image of " + character.name} />
          <div>{maxHealthOutput}</div>
          <TextBox onSubmit={handleHealthSubmit} starterText={"Current Health: " + health + " + " }/>
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetHealth}>Reset Health</button>
          <div>{maxFocusOutput}</div>
          <TextBox onSubmit={handleFocusSubmit} starterText={"Current Focus: " + focus + " + " }/>
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetFocus}>Reset Focus</button>

          <DamageReduction character={character} />
          <p className='subtitle'>Karma: <button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaMinus}>-</button> {karma}<button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaPlus}>+</button><button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={handleClickKarmaReset}>Reset</button></p>
          <Speed character={character} />
          <InitModifier character={character} />
        </div>
      </section>
    );
}

export default CharacterProfile;