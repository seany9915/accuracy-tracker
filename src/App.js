import React, { useState } from 'react';
import './App.css';

function App() {
  const [clientName, setClientName] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const total = correct + incorrect;
  const percentage = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;

  const handleReset = () => {
    setCorrect(0);
    setIncorrect(0);
  };

  const handleExportCSV = () => {
    const headers = ['Client Name', 'Correct', 'Incorrect', 'Percentage'];
    const row = [clientName, correct, incorrect, `${percentage}%`];
    const csvContent = `${headers.join(',')}\n${row.join(',')}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${clientName || 'session'}-accuracy.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <h1>Speech & Language Accuracy Tracker</h1>

      <div className="client-input">
        <label htmlFor="clientName">Client Name:</label>
        <input
          id="clientName"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Enter name..."
        />
      </div>

      {clientName && <h2>Tracking: {clientName}</h2>}

      <div className="counter-section">
        <h3>Accuracy</h3>
        <div className="buttons">
          <button className="correct" onClick={() => setCorrect(correct + 1)}>✅ Correct</button>
          <button className="incorrect" onClick={() => setIncorrect(incorrect + 1)}>❌ Incorrect</button>
        </div>

        <div className="stats">
          <div>Correct: {correct}</div>
          <div>Incorrect: {incorrect}</div>
          <div>Percentage Correct: {percentage}%</div>
        </div>

        <button className="reset" onClick={handleReset}>🔄 Reset</button>
        <button className="export" onClick={handleExportCSV}>📤 Export as CSV</button>
      </div>
    </div>
  );
}

export default App;