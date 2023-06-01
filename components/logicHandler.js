
"use client"
import React, { useState, useEffect} from 'react';

export default function LogicHandlerLevent () {
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

    const matrixData = {
    firstSet: {
      question: "Do you want to slay?",
      firstUrl: "https://www.youtube.com/watch?v=itoSgnv6Y9Y",
      firstStopTime:50,
      scenario1: {
        choice: "Yes",
        url: 'https://www.youtube.com/watch?v=3-6iAyHES3c',
        stopTime: 200
      },
      scenario2: {
        choice: "Noo",
        url: "https://www.youtube.com/watch?v=awZUwBMculE",
        stopTime: 150
      }
    },
    secondSet: {
      question: "What color?",
      scenario1: {
        choice: "Green",
        url: 'https://www.youtube.com/watch?v=OU-ekeecS4Y',
        stopTime: 300
      },
      scenario2: {
        choice: "Blue",
        url: "https://www.youtube.com/watch?v=Ltpxk7L-bVg",
        stopTime: 60
      }
    },
    thirdSet: {
      question: "What Angel?",
      scenario1: {
        choice: "Angelus",
        url: 'https://www.youtube.com/watch?v=N0dyIGkpMmg',
        stopTime: 120
      },
      scenario2: {
        choice: "Banki",
        url: "https://www.youtube.com/watch?v=m2JRghbgeYw",
        stopTime: 190
      }
    },
    provideChoice1:{
      question: "What Color?",
      choice1: "Green",
      choice2: "Blue",
      choice3: "Red",
    },
    provideChoice2:{
      question: "What Color?",
      choice1: "Yellow",
      choice2: "Purple",
      choice3: "Black",
    }
  };

  // Determine the video URL to continue with based on the user's choice
  const [stopTime, setStopTime] = useState(matrixData.firstSet.firstStopTime);
  const [url, setUrl] = useState(matrixData.firstSet.firstUrl);
  const [question, setQuestion] = useState(matrixData.firstSet.question);
  const [choice1, setChoice1] = useState(matrixData.firstSet.scenario1.choice);
  const [choice2, setChoice2] = useState(matrixData.firstSet.scenario2.choice);
  const [saveChoice, setSaveChoice] = useState("");


  
  useEffect(() => {
      switch (data?.choice) {
        case matrixData.firstSet.scenario1.choice:
          setStopTime(matrixData.firstSet.scenario1.stopTime);
          setUrl(matrixData.firstSet.scenario1.url);
          setQuestion(matrixData.secondSet.question);
          setChoice1(matrixData.secondSet.scenario1.choice);
          setChoice2(matrixData.secondSet.scenario2.choice);
          break;
        case matrixData.firstSet.scenario2.choice:
          setStopTime(matrixData.firstSet.scenario2.stopTime);
          setUrl(matrixData.firstSet.scenario2.url);
          setQuestion(matrixData.secondSet.question);
          setChoice1(matrixData.secondSet.scenario1.choice);
          setChoice2(matrixData.secondSet.scenario2.choice);
          break;
        case matrixData.secondSet.scenario1.choice:
          setStopTime(matrixData.secondSet.scenario1.stopTime);
          setUrl(matrixData.secondSet.scenario1.url);
          setQuestion(matrixData.thirdSet.question);
          setChoice1(matrixData.thirdSet.scenario1.choice);
          setChoice2(matrixData.thirdSet.scenario2.choice);
          break;
        case matrixData.secondSet.scenario2.choice:
          setStopTime(matrixData.secondSet.scenario2.stopTime);
          setUrl(matrixData.secondSet.scenario2.url);
          setQuestion(matrixData.thirdSet.question);
          setChoice1(matrixData.thirdSet.scenario1.choice);
          setChoice2(matrixData.thirdSet.scenario2.choice);
          break;
        case matrixData.provideChoice1.choice1:
          setSaveChoice(matrixData.provideChoice1.choice1);
          break;
        case matrixData.provideChoice1.choice2:
          setSaveChoice(matrixData.provideChoice1.choice2);
          break;
        case matrixData.provideChoice1.choice3:
          setSaveChoice(matrixData.provideChoice1.choice3);
          break;
        case matrixData.provideChoice2.choice1:
          setSaveChoice(matrixData.provideChoice2.choice1);
          break;
        case matrixData.provideChoice2.choice2:
          setSaveChoice(matrixData.provideChoice2.choice2);
          break;
        case matrixData.provideChoice2.choice3:
          setSaveChoice(matrixData.provideChoice2.choice3);
          break;
        default:
          break;
      }
  }, [data?.choice,stopTime, url, question, choice1, choice2, saveChoice]);

  useEffect(()=>{
    updateData({stopTime, url, question, choice1, choice2, saveChoice})
  }, [stopTime, url, question, choice1, choice2, saveChoice])

  return (
    <div>{data?.url}</div>
 
  );  
};
