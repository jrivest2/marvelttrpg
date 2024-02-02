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

    return ( 
    <div>
        <form  onSubmit={handleFormSubmit}>
        <input id="search-pre" value={term} onChange={handleChange} />
        </form>
    </div>
    );
}

export default TextBox;