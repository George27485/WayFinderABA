import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

// Assuming generateImage is imported or defined here
const generateImage = async (prompt) => {
  const response = await fetch('AI_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.image_url;
};

const IdentifyEmotion = ({ stimuli, correctAnswer }) => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await Promise.all(
        stimuli.map(async (emotion) => ({
          emotion,
          url: await generateImage(emotion),
        }))
      );
      setImages(fetchedImages);
    };

    fetchImages();
  }, [stimuli]);

  const handleSelect = (emotion) => {
    if (emotion === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    setSelected(emotion);
  };

  const reshuffleStimuli = () => {
    // Implement reshuffle logic here
  };

  return (
    <div className={`identify-emotion ${isShaking ? 'shake' : ''}`}>
      {images.map((image, index) => (
        <div key={index} onClick={() => handleSelect(image.emotion)}>
          <img src={image.url} alt={image.emotion} />
        </div>
      ))}
      {selected === correctAnswer && <Confetti />}
      {selected !== null && selected !== correctAnswer && <div className="wrong">X</div>}
      <button onClick={reshuffleStimuli}>Reshuffle</button>
    </div>
  );
};

export default IdentifyEmotion;
