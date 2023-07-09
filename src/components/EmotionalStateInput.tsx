import { useState } from 'react';
import './EmotionalStateInput.css';

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
  setEmotionJSON: (value: string) => void;
}

const EmotionalStateForm = ({ setEmotionJSON }: Props) => {
  const [stateDescription, setStateDescription] = useState('');

  const createPrompt = (description: string) => {
    return `
    Using this description, generate a json object and populate the field with the relative data. If you find that the description is talking about multiple emotions, seperate them and generate the data for each.
    (Note: always try not to leave and field empty or without data)
    Description:
    
    ${description}
    
    Template: {
     "name": "<Feeling name in one word with first letter capitalized>",
     "description": "<Improved/cleaned description used to generate this data>"
     "energy": "<Feeling energy from 0 to 1>" (Note: 0 to 0.5, negative energy. 0.5 to 1, positive energy),
     "intensity": "<Feeling intensity from 0 to 1>",
     "triggers": ["<Trigger 1>", "<Trigger 2>", "<Trigger 3>", "<Trigger 4>", "<Trigger 5>"],
     "copingMechanisms": ["<Coping Mechanism 1>", "<Coping Mechanism 2>", "<Coping Mechanism 3>", "<Coping Mechanism 4>", "<Coping Mechanism 5>"]
     "tags": ["<tag derived from description 1>", "<tag derived from description 2>", "<tag derived from description 3>"] (Note: do not using the feeling name as a tag)
    }

    Don't leave empty fields!
    `;
  };

  const handleAskChatGPT = () => {
    const propmt = createPrompt(stateDescription);

    navigator.clipboard
      .writeText(propmt)
      .then(() => console.log('Text copied to clipboard'))
      .catch(error => console.log('Failed to copy text:', error));
  };

  return (
    <>
      <div className='log-state'>
        <button>What's on your mind?</button>
        <textarea
          onChange={e => setStateDescription(e.target.value)}
        ></textarea>
        <button onClick={handleAskChatGPT}>
          Ask ChatGPT and bring back the data to paste in box below
        </button>
        <textarea onChange={e => setEmotionJSON(e.target.value)}></textarea>
      </div>
    </>
  );
};

export default EmotionalStateForm;
