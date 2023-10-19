import { useState } from 'react';

function SearchBarPre({ onSubmit }) {
    const [term, setTerm] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term);
    };

    const handleChange = (event) => {
        setTerm(event.target.value);
    };

    return ( 
    <div>
        <form onSubmit={handleFormSubmit}>
        <p>Character Search: <input id="search-pre" value={term} onChange={handleChange} /></p>
        </form>
    </div>
    );
}

export default SearchBarPre;