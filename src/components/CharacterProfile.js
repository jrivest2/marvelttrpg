import ClickRule from "./ClickRule";
import SearchBarPre from "./SearchBarPre";
import { useState } from 'react';
import stats from '../characterSearch_prebuilt.json';
import Speed from './Speed';
import InitModifier from "./InitModifier";
import DamageReduction from "./DamageReduction";
import TextBox from "./TextBox";
import ClickRuleSplitTitle from "./ClickRuleSplitTitle";
import ClickRuleSplitInput from "./ClickRuleSplitInput";

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

  const rankBody = (
    <div>
      <div className="title">Rank</div>
      <div>A character's <i>rank</i> measures their training and raw power. It also determines how many points a player can spend on ability scores and how many power sets, powers and traits a hero can pick.</div>
      <div>As you play your character, their rank <i>can</i> increase over time, allowing the character to improve. Much of the time, though, a character's rank doesn't change.</div>
      <div>Most of the characters in the Marvel Multiverse have a rank between 1 and 6. Your original character doesn't have to begin at the lowest rank, and most of them are unlikely to reach such high ranks where they focus on galactic issues rather than ones on Earth. If you're creating a new hero, your Narrator can help you figure out what rank to start at and what your character's rank cap might be.</div>
      <div>If your Narrator is planning a campaign in which you play young S.H.I.E.L.D operatives, you might start at Rank 1, but if you're going to join the Avengers to fight off a Skrull invasion, you might start at Rank 4,5, or even 6. Sometimes the Narrator might even assign different ranks to heroes in your player group to emulate teams like the Avengers, which often feature heroes with a wide range of ranks.</div>
      <div>Here are some rank benchmarks.</div>
      <ul>
        <li><ClickRule rule={<b>Rank 1—Rookie</b>} children={<text>This is where most normal people rank. If you're a super hero, you're just getting started and are maybe playing through your origin story. Not long ago, you thought you were a normal person, but now things are changing fast.</text>} /></li>
        <li><ClickRule rule={<b>Rank 2—Protector</b>} children={<text>You're a street-level hero who protects a neighborhood—just like Daredevil guards Hell's Kitchen. You could join a team like the Defenders to protect a city.</text>} /></li>
        <li><ClickRule rule={<b>Rank 3—Champion</b>} children={<text>You're a formidable super hero. You could protect a city—like Ms. Marvel (Kamala Khan) protects Jersey City—or join a nationally renowned team like Alpha Flight or the Champions.</text>} /></li>
        <li><ClickRule rule={<b>Rank 4—Legend</b>} children={<text>You're one of the most powerful super heroes in the nation. You could be your country's champion—like the Black Panther or Captain America—or you could join an internationally known team like the Avengers, the Fantastic Four or the X-Men.</text>} /></li>
        <li><ClickRule rule={<b>Rank 5—Mythic</b>} children={<text>You're one of the most powerful super heroes on the planet, like Thor or the Scarlet Witch. You could protect the globe all by yourself, and even elite teams like the Avengers would eagerly welcome you as a member.</text>} /></li>
        <li><ClickRule rule={<b>Rank 6—Cosmic</b>} children={<text>You're powerful enough to intervene in interstellar conflicts and single-handedly change the outcome, like Captain Marvel or the Silver Surfer. You make choices that decide the fate of entire star systems.</text>} /></li>
      </ul>
    </div>
  )
  const maxHealthBody = (
    <div>
      <div>A character's <i>Health</i> measures their capacity to endure physical damage and keep fighting. It (Current Health) can be temporarily lowered by physical damage.</div>
      <div>To calculate a character's Health, muliply their Resilience by 30. The minimum is 10 Health (Max Health), even if the character's Resilience is less than 1.</div>
      <br></br>
      <div><b>Example</b></div>
      <div><i>Spider-Man's Resilience is 3. Multiply that by 30 to determine his Health, which is 90.</i></div>
    </div>
  )
  const maxFocusBody = (
    <div>
      <div>A character's <i>Focus</i> represents their capacity for concentration and willpower. It (Current Focus) can be temporarily lowered by psychic damage or the use of certain powers.</div>
      <div>To calculate a character's Focus, muliply their Vigilance by 30. The minimum is 10 Focus (Max Focus), even if the character's Vigilance is less than 1.</div>
      <br></br>
      <div><b>Example</b></div>
      <div><i>Spider-Man's Vigilance is 3. Multiply that by 30 to determine his Focus, which is 90.</i></div>
    </div>
  )
  const healthBody = (
    <div>
      <div className='subtitle'>Health</div>
      <p>If a character's Health is reduced below 1, they are knocked <i>unconscious</i>. Any powers they were concentrating on end immediately.</p>
      <p>While unconscious, a character cannot take any actions. Their defense against ranged attacks is reduced to 10, and close attacks automatically hit them. If a character's Health is reduced to a negative value equal in magnitude to their maximum Health, or worse, they are <i>killed</i>.</p>
      <p><i><b>When attempting to subtract Health, be sure to enter a minus sign before the number!</b></i></p>
    </div>
  )
  const focusBody = (
    <div>
      <div className='subtitle'>Focus</div>
      <p>If a character's Focus is reduced to 0, they are <i>demoralized</i>.</p>
      <p>Any conditions  or powers they were concentrating on end immediately. While demoralized, they have trouble on all actions. If their Focus is reduced to a negative value equal in magnitude to their maximum Focus, or worse, they are <i>shattered</i>: frozen in place by fear and stress.</p>
      <p><i><b>When attempting to subtract Focus, be sure to enter a minus sign before the number!</b></i></p>
    </div>
  )
  const karmaClickedOutput = (
    <div>
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
    </div>
  )

  return (
    <section className='hero is-danger'>
      <div className='hero-body'>
        <h1>Character Sheet</h1>          
        <SearchBarPre onSubmit={handleSubmit} />
        <p className='title'>{name}</p>
        <p><ClickRuleSplitTitle rule={[<text>RANK</text>, <text>{rank}</text>]} children={rankBody} titleClass={"subtitle"} /></p>
        <p><img src={ character.image } alt={"Image of " + character.name} /></p>
        <p><ClickRuleSplitTitle rule={[<text>Max Health</text>, <text>{maxHealth}</text>]} children={maxHealthBody} titleClass={"subtitle"} /></p>
        <div className="subtitle">
          <ClickRuleSplitInput rule={[<text>Health</text>, <text>{health} + <TextBox onSubmit={handleHealthSubmit} /></text>]} children={healthBody} />
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetHealth}>Reset Health</button>
        </div>
        <p><ClickRuleSplitTitle rule={[<text>Max Focus</text>, <text>{maxFocus}</text>]} children={maxFocusBody} titleClass={"subtitle"} /></p>
        <div className="subtitle">
          <ClickRuleSplitInput rule={[<text>Focus</text>, <text>{focus} + <TextBox onSubmit={handleFocusSubmit} /></text>]} children={focusBody} />
          <button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={resetFocus}>Reset Focus</button>
        </div>
        <DamageReduction character={character} />
        <p><ClickRuleSplitInput rule={[<b>Karma</b>, <text><button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaMinus}>-</button> {karma}<button style={{ backgroundColor: "#f14667", border: "0px solid lightgray", color:"white", fontSize: "25px"}} onClick={handleClickKarmaPlus}>+</button><button style={{ backgroundColor: "", border: "0px solid lightgray", color:"", fontSize: "18px"}} onClick={handleClickKarmaReset}>Reset</button></text>]} children={karmaClickedOutput} titleClass={'subtitle'} /></p>
        <Speed character={character} />
        <br></br>
        <InitModifier character={character} />
      </div>
    </section>
  );
}

export default CharacterProfile;