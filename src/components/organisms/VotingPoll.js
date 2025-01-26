import React, { useState } from 'react';

export default function VotingPoll() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, text: 'Brazil 2014', votes: 65 },
    { id: 2, text: 'South Africa 2010', votes: 28 },
    { id: 3, text: 'Germany 2006', votes: 7 },
  ];

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Voting Poll</h2>
      <p className="mb-4">Which was the best Football World Cup ever in your opinion?</p>
      {options.map((option) => (
        <div key={option.id} className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="poll"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              className="form-radio text-red-600"
            />
            <span>{option.text}</span>
          </label>
          <div className="mt-2 bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-red-600 h-full"
              style={{ width: `${(option.votes / totalVotes) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">{Math.round((option.votes / totalVotes) * 100)}%</span>
        </div>
      ))}
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
        Vote Now
      </button>
    </div>
  );
}