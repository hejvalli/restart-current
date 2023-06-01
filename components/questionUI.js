"use client"

import React, {useState, useEffect} from 'react';

const QuestionUI = () => {
  const [choice, setChoice] = useState("");
  const [data, setData] = useState(null);

  async function updateData(input) {
    try {
      const response = await fetch('/api/handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchData() {
    const response = await fetch('/api/handler');
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  const intervalId = setInterval(fetchData, 1500); // Fetch data every 1.5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleOnClick = async (choice) => {
    setChoice(choice);
    await updateData({choice}); // update the data when a button is clicked
  };

  return (
    <div>
      <button className='text-black' onClick={() => handleOnClick(data?.choice1)}>
        {data?.choice1}
      </button>
      <button className="text-black" onClick={() => handleOnClick(data?.choice2)}>
        {data?.choice2}
      </button>
    </div>
  );
};

export default QuestionUI;
