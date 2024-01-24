import { useState } from 'react';

function ClickRule({rule, children, classRule}) {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    const standardOutput = <div onClick={handleClick}>{rule}<sup className='clickScript'>i</sup></div>
    const clickedOutput = (
        <div>
            <div onClick={handleClick}>{rule}<sup className='clickScript'>i</sup></div>
            <hr />
            <div className={classRule}>
                {children}
            </div>
            <hr />
        </div>
    );
    return <div>{ isClicked ? clickedOutput : standardOutput }</div>
}

export default ClickRule;