import SpeedShow from "./SpeedShow";

function Speed({character}) {
    const baseSpeed = 5;
    let runSpeed = null;
    let climbSpeed = null;
    let jumpSpeed = null;
    let nonCombatJumpSpeed = null;
    let swimSpeed = null;
    let flightSpeed = null;
    let nonCombatFlightSpeed = null;
    let swingSpeed = null;
    let glideSpeed = null;
    let levitateSpeed = null;
    
    let defaultSpeeds = {
        "Run": () => {runSpeed = baseSpeed + parseInt(character.agility / 5)},
        "Climb": () => {climbSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Jump": () => {jumpSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Non-Combat Jump": () => {nonCombatJumpSpeed = 0},
        "Swim": () => {swimSpeed = parseInt(runSpeed / 2) + runSpeed % 2},
        "Flight": () => {flightSpeed = 0},
        "Non-Combat Flight": () => {nonCombatFlightSpeed = 0},
        "Glide": () => {glideSpeed = 0},
        "Swingline": () => {swingSpeed = 0},
        "Levitation": () => {levitateSpeed = 0}
    };
    

    const powerValues = {
        "Jump 1": () => {jumpSpeed = runSpeed},
        "Jump 2": () => {jumpSpeed = character.rank * runSpeed; nonCombatJumpSpeed = 3 * jumpSpeed},
        "Jump 3": () => {jumpSpeed = character.rank * runSpeed; nonCombatJumpSpeed = 50 * jumpSpeed},
        "Wallcrawling": () => {climbSpeed = runSpeed},
        "Flight 1": () => { flightSpeed = character.rank * runSpeed; nonCombatFlightSpeed = 3 * flightSpeed; jumpSpeed = 0;nonCombatJumpSpeed = 0},
        "Flight 2": () => { flightSpeed = character.rank * runSpeed; nonCombatFlightSpeed = 50 * flightSpeed; jumpSpeed = 0;nonCombatJumpSpeed = 0},
        "Webslinging": () => {swingSpeed = 3 * runSpeed},
        "Webgliding": () => {glideSpeed = 2 * runSpeed},
        "Levitation": () => {levitateSpeed = runSpeed}
    }

    const traitValues = {
        "Big (Reach 2)" : () => {runSpeed++}
    }

    let outputSpeeds = {
        "Run": () => {return runSpeed},
        "Climb": () => {return climbSpeed},
        "Jump": () => {return jumpSpeed},
        "Non-Combat Jump": () => {return nonCombatJumpSpeed},
        "Swim": () => {return swimSpeed},
        "Flight": () => {return flightSpeed},
        "Non-Combat Flight": () => {return nonCombatFlightSpeed},
        "Glide": () => {return glideSpeed},
        "Swingline": () => {return swingSpeed},
        "Levitation": () => {return levitateSpeed}
    };

    // Set default Speed Stats
    Object.entries(defaultSpeeds).forEach((speedType) => {
        const [type, func] = speedType;
        func();
    });
    
    // Calculate Special Speeds from Traits
    character.traits.forEach((trait) => {
            
        if (trait in traitValues) {
            let func = traitValues[trait];
            func();
        }
    });
    
    // Calculate Special Speeds from Powers
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