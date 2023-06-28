import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EmotionalState {
  id: number;
  name: string;
}

const EmotionalState = () => {
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/emotional-states/')
      .then((res: any) => {
        setEmotionalStates(res.data);
      });
  }, []);

  return (
    <>
      <div>EmotionalState</div>
      {emotionalStates.map(es => (
        <p key={es.id}>{es.name}</p>
      ))}
    </>
  );
};

export default EmotionalState;
