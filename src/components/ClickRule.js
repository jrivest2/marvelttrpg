import { useState } from 'react';

function ClickRule({rule, children, bodyClass, titleClass}) {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    const standardOutput = <div className={titleClass} onClick={handleClick}>{rule}<sup className='clickScript'>i</sup></div>
    const clickedOutput = (
        <div>
            <div className={titleClass} onClick={handleClick}>{rule}<sup className='clickScript'>i</sup></div>
            <hr />
            <div className={bodyClass}>
                {children}
            </div>
            <hr />
        </div>
    );
    return <div>{ isClicked ? clickedOutput : standardOutput }</div>
}

export default ClickRule;