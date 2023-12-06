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


  let baseKarma = 0;
  let tagValues = {
    "Heroic": (char) => { baseKarma = char.rank; },
  }

  let traitValues = {
    "Battle Ready": (char) => {maxFocus = 30 * char.vigilance + 30}
  }


  traitFocus(character)

  const [health, setHealth] = useState(maxHealth)
  const [focus, setFocus] = useState(maxFocus)
  
  
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
  
  heroicKarma(character)
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
  
  const [isKarmaClicked, setIsKarmaClicked] = useState(false)

  const handleMaxHealthClick = () => {
    if (isMaxHealthClicked) setIsMaxHealthClicked(false)
    else setIsMaxHealthClicked(true)
  }

  const handleMaxFocusClick = () => {
    if (isMaxFocusClicked) setIsMaxFocusClicked(false)
    else setIsMaxFocusClicked(true)
  }

  const handleKarmaClick = () => {
    if (isKarmaClicked) setIsKarmaClicked(false)
    else setIsKarmaClicked(true)
  }

  let maxHealthOutput = <p className="subtitle" onClick={handleMaxHealthClick}>Max Health: {maxHealth}</p>
  let maxFocusOutput = <p className="subtitle" onClick={handleMaxFocusClick}>Max Focus: {maxFocus}</p>
  
  let karmaClickedOutput = <div></div>;
  
  if (isMaxHealthClicked) {
    maxHealthOutput = (
    <div onClick={handleMaxHealthClick}>
      <div className="subtitle">Max Health: {maxHealth}</div>
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
    <div className="subtitle" onClick={handleMaxFocusClick}>
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
  if (isKarmaClicked) {
    karmaClickedOutput = (
      <div>
        <hr></hr>
        <div className="title"><b>Karma</b></div>
        <div><i>Karma</i> represents that wild mix of luck, grit and destiny that seems to intervene in the lives of heroes. All heroes have Karma equal to their rank. To be considered a hero, the character has to have the tag "Heroic".</div>
        <br></br>
        <div><b>Example:</b> <i>Spider-Man is Rank 4, so he has 4 points of Karma.</i></div>
        <br></br>
        <div className="subtitle">Using Karma</div>
        <div>After a character makes an action check, they can spend a point of Karma to gain an edge on the check. This allows them to reroll one of their dice.</div>
        <div>When an enemy makes an action check that affects a character, the target can spend a point of Karma to give the attacker trouble on the check. This forces the attacker to reroll the best one of their dice.</div>
        <div>A character cannot spend more than 1 point of Karma on any given action check.</div>
        <div>A character's Karma resets to its standard number each time they get a decent night's sleep.</div>
        <br></br>
        <div className="subtitle">Recovering with Karma</div>
        <div>If a hero is low on Health or Focus, they can spend a Karma point to make an action check to recover some of it.</div>
        <div>For a Health recovery, make a Resilience check. For a Focus recovery, make a Vigilance check. The target number for either is 10.</div>
        <div>On a success, total up the number normally and multiply it by the character's rank, just like you would with a damage roll. The character gains that many Health or focus points back, up to their maximum scores. A Fantastic success gives double that amount back.</div>
        <div>You cannot spend additional Karma on this check to reroll a die.</div>
        <div>In some circumstances, a character's teammate can spend a point of Karma to give them a recovery check as well.</div>
        <br></br>
        <div className="subtitle">Earning Karma</div>
        <div>The Narrator can give a character a point of Karma for several reasons, at their discretion. Some examples include:</div>
        <ul>
          <li>The player did an excellent job role-playing the character.</li>
          <li>The character rescued someone.</li>
          <li>The character went out of their way to help someone.</li>
          <li>The character made an inspiring speech.</li>
          <li>The character shouted their catchphrase at an appropriate moment.</li>
          <li>One of the character's challenging traits came into play.</li>
        </ul>
        <div>A character can have more Karma than their starting number, but if they fail to spend it before their Karma resets, they lose the excess.</div>
        <br></br>
        <div className="subtitle">Karma and Acting Heroic</div>
        <div>Only characters with the tag "Heroic" start out with Karma, but other characters can earn Karma too by doing good things—even if they are not generally heroic people. This includes villains, like Doctor Doom or Killmonger, and the antiheroes like the Punisher too.</div>
        <div>To make any use out of the Karma they earn, these non-heroes should spend it that same day. Otherwise, after they have a full night's sleep, their earned Karma vanishes.</div>
        <hr></hr>
      </div>
    )
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
        <div className="subtitle">
          <TextBox onSubmit={handleHealthSubmit} starterText={"Current Health: " + health + " + " }/>
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetHealth}>Reset Health</button>
        </div>
        <div>{maxFocusOutput}</div>
        <div className="subtitle">
          <TextBox onSubmit={handleFocusSubmit} starterText={"Current Focus: " + focus + " + " }/>
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetFocus}>Reset Focus</button>
        </div>
        <DamageReduction character={character} />
        <p className='subtitle'><b onClick={handleKarmaClick}>Karma</b>: <button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaMinus}>-</button> {karma}<button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaPlus}>+</button><button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={handleClickKarmaReset}>Reset</button></p>
        <div>{karmaClickedOutput}</div>
        <Speed character={character} />
        <br></br>
        <InitModifier character={character} />
      </div>
    </section>
  );
}

export default CharacterProfile;