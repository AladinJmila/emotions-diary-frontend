import { useState } from 'react';

function EmoState({ emos }) {
  const [show, setShow] = useState(false);

  return (
    <li key={emos.id}>
      <button onClick={() => setShow(show ? false : true)}>
        {emos.emotion.name}
      </button>
      {show && <p>{emos.trigger}</p>}
    </li>
  );
}

export default EmoState;
