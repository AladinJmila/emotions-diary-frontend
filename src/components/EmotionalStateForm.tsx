import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmotionalStateForm.css';

export interface EmotionalState {
  id?: number;
  name: string;
  description: string;
  energy: number;
  intensity: number;
  triggers: string[];
  copingMechanisms: string[];
  tags: string[];
}

interface Props {
  setPassThis: (value: string) => void;
}

const EmotionalStateForm = ({ setPassThis }: Props) => {
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([]);
  const [stateDescription, setStateDescription] = useState('');
  const [stateJSON, setStateJSON] = useState('');

  const createPrompt = (description: string) => {
    return `
    Using this description, generate a json object and populate the field with the relative data
    Description:
    
    ${description}
    
    Template: {
     "name": "<Feeling name in one word>",
     "description": "<Improved/cleaned description used to generate this data>"
     "energy": "<Feeling energy from 0 to 1 (0 to 0.5, negative energy. 0.5 to 1, positive energy)>",
     "intensity": "<Feeling intensity from 0 to 1>",
     "triggers": ["<Trigger 1>", "<Trigger 2>", "<Trigger 3>", "<Trigger 4>", "<Trigger 5>"],
     "copingMechanisms": ["<Coping Mechanism 1>", "<Coping Mechanism 2>", "<Coping Mechanism 3>", "<Coping Mechanism 4>", "<Coping Mechanism 5>"]
     "tags": ["<tag derived from description 1>", "<tag derived from description 2>", "<tag derived from description 3>"]
    }
    `;
  };

  const handleAskChatGPT = () => {
    const propmt = createPrompt(stateDescription);

    navigator.clipboard
      .writeText(propmt)
      .then(() => console.log('Text copied to clipboard'))
      .catch(error => console.log('Failed to copy text:', error));
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/emotional-states/')
      .then((res: any) => {
        setEmotionalStates(res.data);
      });
  }, []);

  return (
    <>
      <div className='log-state'>
        <button>What's on your mind?</button>
        <textarea
          cols={50}
          rows={25}
          onChange={e => setStateDescription(e.target.value)}
        ></textarea>
        <button onClick={handleAskChatGPT}>
          Ask ChatGPT and bring back the data to paste in box below
        </button>
        <textarea
          cols={50}
          rows={25}
          onChange={e => setStateJSON(e.target.value)}
        ></textarea>
        <button onClick={() => setPassThis(stateJSON)}>
          View emotional state
        </button>
      </div>
    </>
  );
};

export default EmotionalStateForm;
