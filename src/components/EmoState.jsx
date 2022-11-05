import { useState } from 'react';

function EmoState({ emos }) {
  const [show, setShow] = useState(false);
  const grey = 25.5 * emos.emotion.posNeg;
  const styles = {
    backgroundColor: `rgb(${grey}, ${grey}, ${grey})`,
    color: emos.emotion.posNeg < 5 ? '#fff' : '#000',
  };

  return (
    <li>
      <button style={styles} onClick={() => setShow(show ? false : true)}>
        {emos.emotion.name}
      </button>
      {show && <p>{emos.trigger}</p>}
    </li>
  );
}

export default EmoState;
