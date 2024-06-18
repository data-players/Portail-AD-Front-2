import React, { useState, useRef, useEffect } from 'react';
import './InputWithStyledPlaceholder.css';

const InputWithStyledPlaceholder = ({ placeholder, children,className }) => {
    const [query, setQuery] = useState('');
    const searchBoxRef = useRef(null);

    useEffect(() => {
        const inputElement = searchBoxRef.current.querySelector('input');
        if (inputElement) {
            inputElement.addEventListener('keyup', handleInputChange);
            if (inputElement.value) {
                setQuery(inputElement.value)
            }
        }
    }, []);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className={className}>
            <div className="inputHolderContainer">
                {!query && (
                    <span className="input-placeholder">
                        {placeholder}
                    </span>
                )}
                <div ref={searchBoxRef}>
                    {children}
                </div>
            </div>
        </div>

    );
};

export default InputWithStyledPlaceholder;