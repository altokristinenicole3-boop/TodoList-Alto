import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [headings, setHeadings] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [itemInputs, setItemInputs] = useState({});

  const addHeading = () => {
    if (headingInput.trim() === '') return;
    const newHeading = {
      id: Date.now(),
      title: headingInput,
      items: []
    };
    setHeadings([...headings, newHeading]);
    setHeadingInput('');
  };

  const deleteHeading = (id) => {
    setHeadings(headings.filter(h => h.id !== id));
    const newInputs = { ...itemInputs };
    delete newInputs[id];
    setItemInputs(newInputs);
  };

  const addItem = (headingId) => {
    const text = itemInputs[headingId] || '';
    if (text.trim() === '') return;
    
    setHeadings(
      headings.map(h => {
        if (h.id === headingId) {
          return {
            ...h,
            items: [...h.items, { id: Date.now(), text: text }]
          };
        }
        return h;
      })
    );
    
    setItemInputs({ ...itemInputs, [headingId]: '' });
  };

  const deleteItem = (headingId, itemId) => {
    setHeadings(
      headings.map(h => {
        if (h.id === headingId) {
          return {
            ...h,
            items: h.items.filter(i => i.id !== itemId)
          };
        }
        return h;
      })
    );
  };

  const handleItemInputChange = (headingId, value) => {
    setItemInputs({ ...itemInputs, [headingId]: value });
  };

  return (
    <div className="app-container">
      <h1>📝 My Todo List</h1>

      <div className="heading-input-section">
        <input
          type="text"
          value={headingInput}
          onChange={(e) => setHeadingInput(e.target.value)}
          placeholder="Enter heading name..."
          onKeyPress={(e) => e.key === 'Enter' && addHeading()}
        />
        <button className="add-heading-btn" onClick={addHeading}>Add Heading</button>
      </div>

      <div className="headings-container">
        {headings.length === 0 ? (
          <p className="empty-text">No lists yet. Add a heading to start! ✨</p>
        ) : (
          headings.map(heading => (
            <div key={heading.id} className="list-card">
              <div className="card-header">
                <h2>{heading.title}</h2>
                <button 
                  className="delete-heading-btn" 
                  onClick={() => deleteHeading(heading.id)}
                >
                  Delete Heading
                </button>
              </div>

              <div className="add-item-row">
                <input
                  type="text"
                  value={itemInputs[heading.id] || ''}
                  onChange={(e) => handleItemInputChange(heading.id, e.target.value)}
                  placeholder="Add list item..."
                  onKeyPress={(e) => e.key === 'Enter' && addItem(heading.id)}
                />
                <button className="add-item-btn" onClick={() => addItem(heading.id)}>Add List</button>
              </div>

              <div className="add_list">
                {heading.items.length === 0 ? (
                  <p className="empty-items">No items yet</p>
                ) : (
                  heading.items.map(item => (
                    <div key={item.id} className="list-item">
                      <span>{item.text}</span>
                      <button 
                        className="delete-item-btn"
                        onClick={() => deleteItem(heading.id, item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;