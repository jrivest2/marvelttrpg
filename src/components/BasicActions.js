import { useState } from "react";

function BasicActions() {
    
    const [isStandardActionClicked, setIsStandardActionClicked] = useState(false)
    const [isReactionClicked, setIsReactionClicked] = useState(false)
    const [isMovementClicked, setIsMovementClicked] = useState(false)
    
    const handleStandardActionClick = () => {
        if (isStandardActionClicked) setIsStandardActionClicked(false)
        else setIsStandardActionClicked(true) 
    }
    const handleReactionClick = () => {
        if (isReactionClicked) setIsReactionClicked(false)
        else setIsReactionClicked(true)
    }
    const handleMovementClick = () => {
        if (isMovementClicked) setIsMovementClicked(false)
        else setIsMovementClicked(true)
    }    
    



    let standardActionsOutput = <div onClick={handleStandardActionClick}><b>Standard Actions</b><sup className="clickScript">i</sup></div>
    let reactionsOutput = <div onClick={handleReactionClick}><b>Reactions</b><sup className="clickScript">i</sup></div>
    let movementOutput = <div onClick={handleMovementClick}><b>Movement Actions</b><sup className="clickScript">i</sup></div>

    if (isStandardActionClicked) {
        standardActionsOutput = (
            <div>
                <div onClick={handleStandardActionClick}><b>Standard Actions</b><sup className="clickScript">i</sup></div>
                <hr></hr>
                <div>[INSERT STANDARD ACTIONS HERE]</div>
                <hr></hr>
            </div>
        );
    }

    if (isReactionClicked) {
        reactionsOutput = (
            <div>
                <div onClick={handleReactionClick}><b>Reactions</b><sup className="clickScript">i</sup></div>
                <hr></hr>
                <div>[INSERT REACTIONS HERE]</div>
                <hr></hr>
            </div>
        );
    }

    if (isMovementClicked) {
        movementOutput = (
            <div>
                <div onClick={handleMovementClick}><b>Movement Actions</b><sup className="clickScript">i</sup></div>
                <hr></hr>
                <div>[INSERT MOVEMENT ACTIONS HERE]</div>
                <hr></hr>
            </div>
        );
    }
    
    return (
        <div>
            <div className="subtitle"><b>Basic Actions</b></div>
            <div>{standardActionsOutput}</div>
            <div>{reactionsOutput}</div>
            <div>{movementOutput}</div>
        </div>
    );
}

export default BasicActions;