import React, { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [remainingChars, setRemainingChars] = useState(10);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setText(inputValue);

    // Count remaining characters
    const remaining = 10 - inputValue.length;
    setRemainingChars(remaining);

    // Disable submit button if character limit exceeded
    setIsSubmitDisabled(inputValue.length > 10);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and display the paragraph
    console.log('Submitted text:', text);
  };

  const renderTextWithLinks = () => {
    // Convert @mentions and #hashtags to links
    let renderedText = text;
    renderedText = renderedText.replace(/@(\w+)/g, '<a href="https://example.com/$1">@$1</a>');
    renderedText = renderedText.replace(/#(\w+)/g, '<a href="https://example.com/tags/$1">#$1</a>');

    return <p dangerouslySetInnerHTML={{ __html: renderedText }} />;
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={text}
          onChange={handleChange}
          style={{
            border: remainingChars < 0 ? '2px solid red' : '1px solid black',
            width: '300px',
            height: '150px',
            padding: '10px',
            resize: 'none',
          }}
        />
        <div>
          Characters Remaining: {remainingChars}
          {remainingChars <= 16 && (
            <span style={{ color: 'red' }}> (Warning: {Math.floor((remainingChars / 10) * 100)}% remaining)</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
      {text && (
        <div>
          <h3>Submitted Paragraph:</h3>
          {renderTextWithLinks()}
        </div>
      )}
    </div>
  );
};

export default App;
