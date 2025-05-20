import React, { useState } from 'react';

const ScoreBoard = ({ match }) => {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);

  const handleRun = (runs) => {
    setScore(score + runs);
  };

  const handleWicket = () => {
    setWickets(wickets + 1);
  };

  return (
    <div className="my-4">
      <h3>Scoreboard</h3>
      <p>{match.teamA} vs {match.teamB}</p>
      <p>Score: {score}/{wickets}</p>
      <button onClick={() => handleRun(1)}>1</button>
      <button onClick={() => handleRun(2)}>2</button>
      <button onClick={() => handleRun(3)}>3</button>
      <button onClick={() => handleRun(4)}>4</button>
      <button onClick={() => handleRun(6)}>6</button>
      <button onClick={handleWicket}>W</button>
    </div>
  );
};

export default ScoreBoard;
