import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './IN.css';
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
  const [sliderValue, setSliderValue] = useState(0); // Initial slider value for color intensity

  useEffect(() => {
    let timer;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
        setSelected(null); // Reset selected stimulus after confetti display
      }, 10000); // Adjust the duration as needed (e.g., 10000ms = 10 seconds)
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

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

  return (
    <div className={`identify-name ${isShaking ? 'shake' : ''}`}>
      {showInputSection && (
        <div className="input-section">
          <input
            type="text"
            value={newStimulus}
            onChange={(e) => setNewStimulus(e.target.value)}
            placeholder="Add new stimulus"
          />
          <button onClick={handleAddStimulus}>Add Stimulus</button>
          <input
            type="text"
            value={newCorrectAnswer}
            onChange={(e) => setNewCorrectAnswer(e.target.value)}
            placeholder="Set correct answer"
          />
          <button onClick={handleSetCorrectAnswer}>Set Correct Answer</button>
        </div>
      )}
      <div className="stimuli-section">
        {stimuli.map((stimulus, index) => (
          <div
            key={index}
            className={`stimulus-card ${stimulus === correctAnswer ? 'correct-answer' : ''}`}
            onClick={() => handleSelect(stimulus)}
            style={{
              backgroundColor:
                showCorrectAnswerBorder && stimulus === correctAnswer
                  ? `rgba(0, 255, 0, ${sliderValue / 100})`
                  : '#f0f0f0',
              border: showCorrectAnswerBorder && stimulus === correctAnswer ? '2px solid green' : '1px solid #ccc',
            }}
          >
            {stimulus}
          </div>
        ))}
      </div>
      {showConfetti && <Confetti />}
      {selected !== null && selected !== correctAnswer && (
        <div className="confetti-container">
          <div className="wrong">X</div>
        </div>
      )}
      <button onClick={reshuffleStimuli}>Reshuffle</button>
      <button onClick={() => setShowInputSection(!showInputSection)}>
        {showInputSection ? 'Hide Input' : 'Show Input'}
      </button>
      <div className="slider-container">
        <InputSlider
          axis="x"
          x={sliderValue}
          onChange={({ x }) => setSliderValue(x)}
          xmin={0}
          xmax={100}
        />
        <p>Prompt Intensity: {sliderValue}</p>
      </div>
      <button onClick={toggleCorrectAnswerBorder}>
        {showCorrectAnswerBorder ? 'UnToggle Prompt' : 'Toggle Prompt'}
      </button>
    </div>
  );
};

export default IdentifyName;
