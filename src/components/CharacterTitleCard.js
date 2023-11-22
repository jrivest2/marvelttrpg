import stats from "../characterSearch_prebuilt.json"

function CharacterTitleCard({character, img, rank, char, updateChar, updateRender}) {


    const clickCharacterHandler = () => {
        let newCharacter = stats.filter(newChar => newChar.name == char.name)[0]
        console.log(newCharacter)
        updateChar(newCharacter)
        updateRender("Not Default")
    }


    return (
        <div className='column is-4'>
            <div className="card" onClick={clickCharacterHandler}>
                <div className="card-image">
                    <figure className="image is-1by1">
                        <img src={img} alt={character} style={{width: "500px"}}/>
                    </figure>
                </div>

                <div className="card=content">
                    <div className="media-content">
                        <p className="title is-4">{character}</p>
                        <p className="subtitle is-6">Rank: {rank}</p>
                    </div>
                    {/* < div className="content">{description}</div>                 */}
                </div>  
            </div>
        </div>
    );
}

export default CharacterTitleCard;