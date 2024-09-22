import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or API error', error);
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedFilters.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
        {selectedFilters.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
        {selectedFilters.includes('Highest Lowercase Alphabet') && <div>Highest Lowercase Alphabet: {highest_lowercase_alphabet}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1>Submit JSON Data</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h3>Filters</h3>
        <select multiple={true} onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
        </select>
      </div>

      <div>
        <h3>Response</h3>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
