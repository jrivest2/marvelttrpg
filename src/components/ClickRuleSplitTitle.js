import { useState } from 'react';

function ClickRuleSplitTitle({rule, children, bodyClass, titleClass}) {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    const standardOutput = <div className={titleClass} onClick={handleClick}>{rule[0]}<sup className='clickScript'>i</sup>: {rule[1]}</div>
    const clickedOutput = (
        <div>
            <div className={titleClass} onClick={handleClick}>{rule[0]}<sup className='clickScript'>i</sup>: {rule[1]}</div>
            <hr />
            <div className={bodyClass}>
                {children}
            </div>
            <hr />
        </div>
    );
    return <div>{ isClicked ? clickedOutput : standardOutput }</div>
}

export default ClickRuleSplitTitle;