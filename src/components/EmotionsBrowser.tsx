import { useEffect } from 'react';

import './EmotionsBrowser.css';

interface Props {
  passThis: string;
}

const EmotionsBrowser = ({ passThis }: Props) => {
  useEffect(() => {
    console.log('passThis ', JSON.parse(passThis));
  }, [passThis]);

  return (
    <div className='emotions-browser'>
      <h2>EmotionsBrowser</h2>
    </div>
  );
};

export default EmotionsBrowser;
