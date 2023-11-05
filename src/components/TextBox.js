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

    return ( 
    <div>
        <form  onSubmit={handleFormSubmit}>
        <p>{starterText} <input id="search-pre" value={term} onChange={handleChange} /></p>
        </form>
    </div>
    );
}

export default TextBox;