import Origin from "./Origin";
import Occupation from "./Occupation";

function Biography({character}) {
    /*
    "name": "Otto Octavius",
    "height": "5'9\"",
    "weight": "245 lbs.",
    "gender": "Male",
    "eyes": "Brown",
    "hair": "Brown",
    "size": "Average",
    "features": "Four Mechanical Arms",
    "occupation": "Scientist",
    "origin": "High Tech, Weird Science",
    "teams": "Masters of Evil, Sinister Six",
    "base": "New York City",
    "history": "Everything changed for brilliant scientist Otto Octavius after a lab experiment gone wrong drove him mad and left him with mental control of four powerful arms. With these powerful limbs at his disposal, Octavius decided to finance his future research through crime, becoming the super villain Doctor Octopus.\n\nDoc Ock's life has been intertwined with that of his one-time admirer Peter Parker (Spider-Man). Ock has fought Spider-Man countless times, romanced Parker's Aunt May and even become Parker himself for a brief period. As more multiversal variants of Spider-Man appear, more versions of Doc Ock have also manifested themselves.",
    "personality": "Doctor Octopus is a Grade-A n
    */
   let features = ""
    if (!character.biography.features) features = "None"
    else features = character.biography.features

    return (
        <div>
            <div className="subtitle"><b>BIOGRAPHY</b></div>
            <div><b>Real Name:</b> {character.biography.name}</div>
            <div><b>Height:</b> {character.biography.height}</div>
            <div><b>Weight:</b> {character.biography.weight}</div>
            <div><b>Gender:</b> {character.biography.gender}</div>
            <div><b>Eyes:</b> {character.biography.eyes}</div>
            <div><b>Hair:</b> {character.biography.hair}</div>
            <div><b>Size:</b> {character.biography.size}</div>
            
            <div><b>Distinguishing Features:</b> {features}</div>
            <Occupation occupations={character.biography.occupation} />
            <Origin origins={character.biography.origin} />
            <div><b>Teams:</b> {character.biography.teams}</div>
            <div><b>Base:</b> {character.biography.base}</div>
            <div><b>History:</b> {character.biography.history}</div>
            <div><b>Personality:</b> {character.biography.personality}</div>
        </div>
    );
}

export default Biography;