import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { shadesOfGrey } from '../utilities/helpers';

function EmoState({ emos }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [show]);

  const styles = {
    backgroundColor: shadesOfGrey[emos.emotion.posNeg - 1],
    color: shadesOfGrey
      .slice(0, 5)
      .includes(shadesOfGrey[emos.emotion.posNeg - 1])
      ? 'white'
      : 'black',
  };

  const date = new Date(emos.date);

  return (
    <li ref={ref}>
      <button style={styles} onClick={() => setShow(show ? false : true)}>
        {emos.emotion.name}
        <span>
          {date.getHours()} : {date.getMinutes()}
        </span>
      </button>
      {show && <p>{emos.trigger}</p>}
    </li>
  );
}

export default EmoState;
