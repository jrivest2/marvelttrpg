import { useState } from 'react';

function ClickRuleSplitInput({rule, children, bodyClass, titleClass}) {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }

    const standardOutput = <div><text className={titleClass} onClick={handleClick}>{rule[0]}<sup className='clickScript'>i</sup></text><text>: {rule[1]}</text></div>
    const clickedOutput = (
        <div>
            <div><text className={titleClass} onClick={handleClick}>{rule[0]}<sup className='clickScript'>i</sup></text><text>: {rule[1]}</text></div>
            <hr />
            <div className={bodyClass}>
                {children}
            </div>
            <hr />
        </div>
    );
    return <div>{ isClicked ? clickedOutput : standardOutput }</div>
}

export default ClickRuleSplitInput;