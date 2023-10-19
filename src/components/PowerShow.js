import {useState} from 'react';

function PowerShow({power}) {
    
    let [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    if (isClicked) {
        return (
            <div>
                <div onClick={handleClick}>{power}</div>
                <hr></hr>
                <div>INSERT {power}'S DETAILS HERE</div>
                <hr></hr>
            </div>
        )
    }
    return <div onClick={handleClick}>{power}</div>

    // Use the below return instead when powersFile/powerRules.JSON is complete
    // return <div>{power.name}</div>

};

export default PowerShow;