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
  
    const handleSubmit = (term) => {
      if (stats.filter(newChar => newChar.name == term)[0]) {
        let newCharacter = stats.filter(newChar => newChar.name == term)[0]
        updateChar(newCharacter)
        heroicKarma(newCharacter);
        setKarma(baseKarma)
        setHealth(30 * newCharacter.resilience)
        setFocus(30 * newCharacter.vigilance)  
      }
    };

    let maxHealth = 30 * resilience;
    let maxFocus = 30 * vigilance;
    const [health, setHealth] = useState(30 * resilience)
    const [focus, setFocus] = useState(30 * vigilance)

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
      "Heroic": (char) => { baseKarma = char.rank; }
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
    return (
      <section className='hero is-danger'>
        <div className='hero-body'>
          <h1>Character Sheet</h1>          
          <SearchBarPre onSubmit={handleSubmit} />
          <p className='title'>{name}</p>
          <p className='subtitle'>RANK: {rank}</p>
          <img src={ character.image } alt={"Image of " + character.name} />
          <p>Max Health: {30 * resilience}</p>
          <TextBox onSubmit={handleHealthSubmit} starterText={"Current Health: " + health + " + " }/>
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetHealth}>Reset Health</button>
          <p>Max Focus: {30 * vigilance}</p>
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