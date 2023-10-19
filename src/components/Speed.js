import SpeedShow from "./SpeedShow";

function Speed({character}) {
    const baseSpeed = 5;
    let runSpeed = null;
    let climbSpeed = null;
    let jumpSpeed = null;
    let swimSpeed = null;
    let flightSpeed = null;
    let nonCombatFlightSpeed = null;
    let swingSpeed = null;
    let glideSpeed = null;
    
    /* Use to set Defualt Speeds */
    let speedTypes = {
        "Run": () => {runSpeed = baseSpeed + parseInt(character.agility / 5)},
        "Climb": () => {climbSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Jump": () => {jumpSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Swim": () => {swimSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Flight": () => {flightSpeed = 0},
        "Non-Combat Flight": () => {nonCombatFlightSpeed = 0},
        "Glide": () => {glideSpeed = 0},
        "Swingline": () => {swingSpeed = 0}
    };
    

    const powerValues = {
        "Jump 1": () => {jumpSpeed = runSpeed},
        "Jump 2": () => {jumpSpeed = character.rank * runSpeed},
        "Jump 3": () => {jumpSpeed = character.rank * runSpeed},
        "Wallcrawling": () => {climbSpeed = runSpeed},
        "Flight 1": () => { flightSpeed = character.rank * runSpeed; nonCombatFlightSpeed = 3 * flightSpeed; jumpSpeed = 0},
        "Flight 2": () => { flightSpeed = character.rank * runSpeed; nonCombatFlightSpeed = 50 * flightSpeed; jumpSpeed = 0},
        "Webslinging": () => {swingSpeed = 3 * runSpeed},
        "Webgliding": () => {glideSpeed = 2 * runSpeed},

    }

    const traitValues = {
        "Big (Reach 2)" : () => {runSpeed++}
    }

    let outputSpeeds = {
        "Run": () => {return runSpeed},
        "Climb": () => {return climbSpeed},
        "Jump": () => {return jumpSpeed},
        "Swim": () => {return swimSpeed},
        "Flight": () => {return flightSpeed},
        "Non-Combat Flight": () => {return nonCombatFlightSpeed},
        "Glide": () => {return glideSpeed},
        "Swingline": () => {return swingSpeed}
    };

    // Set default Speed Stats
    Object.entries(speedTypes).forEach((speedType) => {
        const [type, func] = speedType;
        func();
    });
    
    // Calculate Special Speeds
    character.traits.forEach((trait) => {
            
        if (trait in traitValues) {
            let func = traitValues[trait];
            func();
        }
    });
    
    Object.entries(character.powers).forEach((powerSet) => {
        const [set, powers] = powerSet;
        powers.forEach((power) => {
            
            if (power in powerValues) {
                let func = powerValues[power];
                func();
            }
        });
        
    });

    

    let output = Object.entries(outputSpeeds).map((sType, index) => {
        let val = outputSpeeds[sType[0]]()

        return <SpeedShow type={sType[0]} value={val} key={index} />
    });

    return (
        <div>
            <div>SPEED</div>
            <div>{output}</div>
        </div>
    );
};

export default Speed;