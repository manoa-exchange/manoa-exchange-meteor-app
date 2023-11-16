import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'animate.css';

const words = ['Japan', 'Korea', 'France', 'Australia', 'England', 'Spain', 'Italy'];

const AniText = () => {
  const [animationClass, setAnimationClass] = useState('animate__animated animate__fadeInDown');
  const [wordOrder, setWordOrder] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setAnimationClass('animate__animated animate__fadeOutDown');

      setTimeout(() => {
        setWordOrder((prevWordOrder) => (prevWordOrder + 1) % words.length);
        setAnimationClass('animate__animated animate__fadeInDown');
      }, 1000); // Adjust the delay as needed
    }, 2000);

    return () => clearInterval(timeout);
  }, [wordOrder]);

  return (
    <h1>
      <Container id="ani-text" className={animationClass}>{words[wordOrder]}</Container>
    </h1>
  );
};

export default AniText;
