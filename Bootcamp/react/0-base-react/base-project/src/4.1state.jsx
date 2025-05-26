import React, { useState } from 'react';

function StatePractice() {

    const [state, setState] = useState(false);
    // var isDone = false; 
    const strikethroughStyle = {
        textDecoration: state ? "line-through" : "none"
    };

    function handleClick() {
        // isDone = !isDone; // Toggle the state
        // Force a re-render by updating state
        setState(!state);
    }
  
    return (
        <div>
            <div>
                <p style={strikethroughStyle}>parafsfsdfsdfsdf</p>
                <button onClick={handleClick}></button>
            </div>;
        </div>
    );
}

export default StatePractice;