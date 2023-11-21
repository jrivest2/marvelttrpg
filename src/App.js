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

function App() {

  const [character, setCharacter] = useState(stats[0]);
    

  return (
    <div>
     
      <div id='profile'>
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



      <div style={{ backgroundColor: "red", color: "white" }}><b>*********TESTING PURPOSES*********</b></div>



      <div>
        <PowerRules character={character} />
      </div>

    </div>
  );
  
}

export default App;
