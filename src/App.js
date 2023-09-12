import React, { useState } from 'react';
import './App.css';

function App() {
  const API_KEY = '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';
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [history, setHistory] = useState([]);

  async function getMessage() {
    console.log('clicked');
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': inputValue}],
        max_tokens: 100
      })
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Something went wrong.');
      }
  
      const data = await response.json();
      console.log(data);
      const responseText = data.choices[0].message.content;

      if (responseText.includes('book') || responseText.includes('author')) {
        setOutputValue(responseText);
      } else {
        setOutputValue('Sorry, I can only provide information about books and authors.');
      }
  
      if (responseText) {
        setHistory((prevHistory) => [...prevHistory, inputValue]);
      }
    } catch (error) {
      console.error(error.message);
    }
  }  

  function clearInput() {
    setInputValue('');
  }

  return (
    <div>
      <head>
        <title>BookGPT</title>
      </head>

      <body>
        <section className='side-bar'>
          <button onClick={clearInput}>New Chat</button>
          <div className='history'>
            {history.map((item, index) => (
              <p key={index} onClick={() => setInputValue(item)}>
                {item}
              </p>
            ))}
          </div>
          <nav>
            <p>Made by Kam Williams</p>
          </nav>
        </section>

        <section className='main'>
          <h1>BookGPT</h1>
          <p id='output'>{outputValue}</p>
          <div className="book-recommendations">
            {/* You can add other UI elements here if needed */}
          </div>
          <div className='bottom-section'>
            <div className='input-container'>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div id='submit' onClick={getMessage}>
                ➢
              </div>
            </div>
            <p className='info'>
              Book GPT Sep 2 Version. Free Research Preview. Our goal is to
              make AI systems more natural and safe to interact with. Your
              feedback will help us improve.
            </p>
          </div>
        </section>
      </body>
    </div>
  );
}

export default App;