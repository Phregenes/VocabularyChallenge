import React, { useState, useEffect } from 'react';
import wordsData from './words.json';

const WordChallengeComponent = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showCorrectInfo, setShowCorrectInfo] = useState(false); // Estado para controlar a exibição das informações corretas

  useEffect(() => {
    const shuffledWords = wordsData.sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === words[currentWordIndex].palavra.toLowerCase()) {
      setScore(score + 1);
      setUserInput('');
      setCurrentWordIndex(currentWordIndex + 1);
      setShowCorrectInfo(false);
    } else {
      setLives(lives - 1);
      setUserInput('');
      setShowCorrectInfo(true); // Mostra a informação correta em caso de erro
    }
  };

  const hasMoreWords = currentWordIndex < words.length;

  return (
    <div>
      {hasMoreWords ? (
        <div>
          <p>Traduzir para o português: {words[currentWordIndex].tradução}</p>
          <p>Frase de Exemplo: {words[currentWordIndex].fraseExemplo}</p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={checkAnswer}>Verificar</button>
          {showCorrectInfo && (
            <div>
              <p>Palavra correta: {words[currentWordIndex].palavra}</p>
              <p>Pronúncia: {words[currentWordIndex].pronúncia}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Parabéns! Você concluiu todas as palavras!</p>
      )}

      <p>Pontuação: {score}</p>
      <p>Vidas: {lives}</p>
    </div>
  );
};

export default WordChallengeComponent;
