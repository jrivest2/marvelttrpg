import 'bulma/css/bulma.css';
import './App.css';
import stats from './characterSearch_prebuilt.json';
import CharacterProfile from './components/CharacterProfile';
import Damage from './components/Damage';
import Abilities from './components/Abilities';
import { useState } from 'react';
import TraitsTags from './components/TraitsTags';
import Biography from './components/Biography';
import Powers from './components/Powers';
import PowerRules from './components/PowerRules';
import CharacterTitleCard from './components/CharacterTitleCard';

function App() {

  const [character, setCharacter] = useState(stats[0]);
  const [selectChar, setSelectChar] = useState("default");
  

  const characterArray = stats.filter((newChar) => newChar.name != "")
  let outputArr = []
  characterArray.map((character, index) => {
    outputArr = [...outputArr, <CharacterTitleCard character={character.name} img={character.image} rank={character.rank}  char={character} updateChar={setCharacter} updateRender={setSelectChar}/>]
      return (
        <div key={index} className='column is-4'>
          <CharacterTitleCard character={character.name} img={character.image} rank={character.rank} />
        </div>
      );
  });
  
  if (selectChar == "default") {
    return (
      <div>
        <section className='hero is-primary'>
                <div className='hero-body'>
                    <p className='title'>CHOOSE YOUR CHARACTER</p>
                </div>
            </section>

            <div className='container'>
                <section className='section'>
                    <div className='character-list'>
                      {outputArr}
                    </div>
                </section>
            </div>
      </div>
    );
  } else {
    return (
      <div>
        
        <div id='profile' style={{backgroundColor: "#f14667"}}>
          <button onClick={() => {setSelectChar("default")}}>Return To Character Select</button>
          <CharacterProfile character={character} updateChar={setCharacter} />        
        </div>
        
        <div>
        <Abilities character={character} />
        </div>
        
        <hr></hr>
        
        <div>
        <Damage character={character} />
        </div>
        
        <hr></hr>
        
        <div>
        <Powers character={character} />
        </div>
        
        <hr></hr>
        
        <div>
        <TraitsTags character={character} />
        </div>
        
        <hr></hr>
  
        <div>
        <Biography character={character} />
        </div>
        
        <hr></hr>
  
  
  
        {/* <div style={{ backgroundColor: "red", color: "white" }}><b>*********TESTING PURPOSES*********</b></div>
  
  
  
        <div>
          <PowerRules character={character} />
        </div> */}
  
      </div>
    );
  }
  
  
}

export default App;
