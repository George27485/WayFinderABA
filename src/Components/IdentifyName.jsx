import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import InputSlider from 'react-input-slider';

const IdentifyName = () => {
  const [stimuli, setStimuli] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [newStimulus, setNewStimulus] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
  const [showInputSection, setShowInputSection] = useState(true);
  const [showCorrectAnswerBorder, setShowCorrectAnswerBorder] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  useEffect(() => {
    let timer;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
        setSelected(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  useEffect(() => {
    let xTimer;
    if (selected !== null && selected !== correctAnswer) {
      xTimer = setTimeout(() => {
        setSelected(null);
      }, 2000); 
    }
    return () => clearTimeout(xTimer);
  }, [selected, correctAnswer]);

  const handleSelect = (stimulus) => {
    if (stimulus === correctAnswer) {
      setShowConfetti(true);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    setSelected(stimulus);
  };

  const reshuffleStimuli = () => {
    setStimuli([...stimuli].sort(() => Math.random() - 0.5));
  };

  const handleAddStimulus = () => {
    if (newStimulus.trim() !== '') {
      setStimuli([...stimuli, newStimulus]);
      setNewStimulus('');
    }
  };

  const handleSetCorrectAnswer = () => {
    setCorrectAnswer(newCorrectAnswer);
    setNewCorrectAnswer('');
  };

  const toggleCorrectAnswerBorder = () => {
    setShowCorrectAnswerBorder(!showCorrectAnswerBorder);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={`identify-name ${isShaking ? 'shake' : ''} w-screen h-screen flex flex-col items-center justify-center bg-orange-100`}>
      {showInputSection && (
        
        <div className="input-section mb-4">
          <input
            type="text"
            value={newStimulus}
            onChange={(e) => setNewStimulus(e.target.value)}
            placeholder="Add new stimulus"
            className="border border-red-400 p-2 mr-2 rounded-lg"
          />
          <button onClick={handleAddStimulus} className="bg-blue-500 text-white p-2 mr-2 rounded-lg">Add Stimulus</button>
          <input
            type="text"
            value={newCorrectAnswer}
            onChange={(e) => setNewCorrectAnswer(e.target.value)}
            placeholder="Set correct answer"
            className="border border-gray-400 p-2 mr-2 rounded-lg"
          />
          <button onClick={handleSetCorrectAnswer} className="bg-blue-500 text-white p-2 rounded-lg">Set Correct Answer</button>
        </div>
      )}
      <div className="stimuli-section flex flex-wrap gap-4">
        {stimuli.map((stimulus, index) => (
          <div
            key={index}
            className={`stimulus-card p-4 flex items-center justify-center cursor-pointer rounded-2xl bg-white text-black`}
            onClick={() => handleSelect(stimulus)}
            style={{
              backgroundColor: stimulus === correctAnswer && showCorrectAnswerBorder
                ? sliderValue > 0 ? `rgba(0, 255, 0, ${sliderValue / 100})` : 'white'
                : '#fff',
              border: showCorrectAnswerBorder && stimulus === correctAnswer ? '2px solid green' : '1px solid #ccc',
            }}
          >
            {stimulus}
          </div>
        ))}
      </div>
      {showConfetti && <Confetti />}
      {selected !== null && selected !== correctAnswer && (
        <div className="confetti-container fixed inset-0 flex items-center justify-center">
          <div className="wrong text-6xl text-red-600">X</div>
        </div>
      )}
      <button
        onClick={toggleDropdown}
        className="bg-yellow-500 text-white p-2 m-4 rounded-lg absolute top-12 left-0 z-1"
      >
        Toggle Options
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu mt-2 p-4 bg-white shadow-lg rounded-lg border border-gray-300 absolute top-12 left-0">
          <button onClick={reshuffleStimuli} className="bg-yellow-500 text-white p-2 m-2 rounded-lg w-full">Reshuffle</button>
          <button onClick={() => setShowInputSection(!showInputSection)} className="bg-yellow-500 text-white p-2 m-2 rounded-lg w-full">
            {showInputSection ? 'Hide Input' : 'Show Input'}
          </button>
          <div className="slider-container my-4">
            <InputSlider
              axis="x"
              x={sliderValue}
              onChange={({ x }) => setSliderValue(x)}
              xmin={0}
              xmax={100}
            />
            <p className='text-black'> Prompt Intensity: {sliderValue}</p>
          </div>
          <button onClick={toggleCorrectAnswerBorder} className="bg-red-500 text-white p-2 m-2 rounded-lg w-full">
            {showCorrectAnswerBorder ? 'Untoggle Prompt' : 'Toggle Prompt'}
          </button>
          <button onClick={closeDropdown} className="bg-gray-500 text-white p-2 m-2 rounded-lg w-full">Exit</button>
        </div>
      )}
      
    </div>
  );
};

export default IdentifyName;
