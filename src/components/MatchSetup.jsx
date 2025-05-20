import React, { useState, useEffect } from 'react';
import { getTeams } from '../services/teamService';
import { createMatch } from '../services/matchService';

const MatchSetup = () => {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [tossWinner, setTossWinner] = useState('');
  const [battingFirst, setBattingFirst] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await getTeams();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const handleCreateMatch = async () => {
    if (!teamA || !teamB || !tossWinner || !battingFirst) {
      alert('Please fill in all fields');
      return;
    }

    const match = {
      teamA,
      teamB,
      tossWinner,
      battingFirst,
      overs: [],
      result: '',
    };

    await createMatch(match);
    alert('Match created successfully!');
  };

  return (
    <div className="my-4">
      <select onChange={(e) => setTeamA(e.target.value)} value={teamA}>
        <option value="">Select Team A</option>
        {teams.map((team) => (
          <option key={team._id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setTeamB(e.target.value)} value={teamB}>
        <option value="">Select Team B</option>
        {teams.map((team) => (
          <option key={team._id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setTossWinner(e.target.value)} value={tossWinner}>
        <option value="">Select Toss Winner</option>
        <option value={teamA}>{teamA}</option>
        <option value={teamB}>{teamB}</option>
      </select>
      <select onChange={(e) => setBattingFirst(e.target.value)} value={battingFirst}>
        <option value="">Select Batting First</option>
        <option value={teamA}>{teamA}</option>
        <option value={teamB}>{teamB}</option>
      </select>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleCreateMatch}
      >
        Create Match
      </button>
    </div>
  );
};

export default MatchSetup;
