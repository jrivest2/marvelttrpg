import SearchBarPre from "./SearchBarPre";
import { useState } from 'react';
import stats from '../characterSearch_prebuilt.json';
import Speed from './Speed';
import InitModifier from "./InitModifier";
import DamageReduction from "./DamageReduction";

function CharacterProfile({character, updateChar}) {
    
    let name = character.name;
    let rank = character.rank;
    
    let resilience = character.resilience;
    let vigilance = character.vigilance;
  
    const handleSubmit = (term) => {
      if (stats.filter(newChar => newChar.name == term)[0]) {
        let newCharacter = stats.filter(newChar => newChar.name == term)[0]
        updateChar(newCharacter)
        heroicKarma();
        setKarma(baseKarma);
      }
    };

    
    let health = 30 * resilience;
    let focus = 30 * vigilance;



    let baseKarma = 0;
    let tagValues = {
      "Heroic": () => { baseKarma = character.rank; }
    }

    function heroicKarma() {
      character.tags.forEach((tag) => {
        if (tag in tagValues) {
          let func = tagValues[tag];
          func();
        }
      });
    }
    
    const [karma, setKarma] = useState(baseKarma);

    const handleClickKarmaMinus = () => {
      setKarma(karma - 1);
    };
    const handleClickKarmaPlus = () => {
      setKarma(karma + 1);
    };

    const handleClickKarmaReset = () => {
      setKarma(baseKarma);
    }


    heroicKarma();
    return (
      <section className='hero is-danger'>
        <div className='hero-body'>
          <h1>Character Sheet</h1>
          <p>Player Name: <input id="player-name" style={{ border: '1px solid red'}} /></p>
          <div>
            <SearchBarPre onSubmit={handleSubmit} />
          </div>
          <p className='title'>{name}</p>
          <p className='subtitle'>RANK: {rank}</p>
          <img src={ character.image } alt={"Image of " + character.name} />
          
          <p>Health: {health}</p>
          <h3>Focus: {focus}</h3>
          <DamageReduction character={character} />
          <p className='subtitle'>Karma: <button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaMinus}>-</button> {karma}<button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaPlus}>+</button><button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={handleClickKarmaReset}>Reset</button></p>
          <Speed character={character} />
          <InitModifier character={character} />
        </div>
      </section>
    );
}

export default CharacterProfile;