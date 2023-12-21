import { useState } from 'react';

function TextBox({ onSubmit, starterText }) {
    const [term, setTerm] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term);
        setTerm(0);
    };

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    const [isClicked, setIsClicked] = useState(false)


    const handleClick = () => {
        if (isClicked) setIsClicked(false)
        else setIsClicked(true)
    }


    if (isClicked && starterText.includes("Health")) {
        return ( 
            <div>
                <form  onSubmit={handleFormSubmit}>
                <p><b onClick={handleClick}>{starterText}</b><sup className="clickScript">i</sup> <input id="search-pre" value={term} onChange={handleChange} /></p>
                </form>
                <hr></hr>
                <div className='subtitle'>Health</div>
                <p>If a character's Health is reduced below 1, they are knocked <i>unconscious</i>. Any powers they were concentrating on end immediately.</p>
                <p>While unconscious, a character cannot take any actions. Their defense against ranged attacks is reduced to 10, and close attacks automatically hit them. If a character's Health is reduced to a negative value equal in magnitude to their maximum Health, or worse, they are <i>killed</i>.</p>
                <p><i><b>When attempting to subtract Health, be sure to enter a minus sign before the number!</b></i></p>
                <hr></hr>
            </div>
        );
    }
    else if (isClicked && starterText.includes("Focus")) {
        return ( 
            <div>
                <form  onSubmit={handleFormSubmit}>
                <p><b onClick={handleClick}>{starterText}</b><sup className="clickScript">i</sup> <input id="search-pre" value={term} onChange={handleChange} /></p>
                </form>
                <hr></hr>
                <div className='subtitle'>Focus</div>
                <p>If a character's Focus is reduced to 0, they are <i>demoralized</i>.</p>
                <p>Any conditions  or powers they were concentrating on end immediately. While demoralized, they have trouble on all actions. If their Focus is reduced to a negative value equal in magnitude to their maximum Focus, or worse, they are <i>shattered</i>: frozen in place by fear and stress.</p>
                <p><i><b>When attempting to subtract Focus, be sure to enter a minus sign before the number!</b></i></p>
                <hr></hr>
            </div>
        );
    }
    return ( 
    <div>
        <form  onSubmit={handleFormSubmit}>
        <p><b onClick={handleClick}>{starterText}</b><sup className="clickScript">i</sup> <input id="search-pre" value={term} onChange={handleChange} /></p>
        </form>
    </div>
    );
}

export default TextBox;