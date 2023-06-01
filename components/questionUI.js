import React, { useState, useEffect } from 'react';

const QuestionUI = () => {
  const placeholder = "placeholder";
  const [choice, setChoice] = useState(typeof window !== 'undefined' ? localStorage.getItem('choice') : "");

  useEffect(() => {
    // Save the choice to localStorage whenever it changes
    localStorage.setItem('choice', choice);
  }, [choice]);

  const handleOnClick = (choice) => {
    setChoice(choice);
  };

  return (
    <div>
      <button className='text-black' onClick={() => handleOnClick(placeholder)}>
        {placeholder}
      </button>
      <button className="text-black" onClick={() => handleOnClick(placeholder)}>
        {placeholder}
      </button>
      <p>Selected choice: {choice}</p>
    </div>
  );
};

export default QuestionUI;
