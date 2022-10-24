import { useFetch } from '../hooks/useFetch';
import './Editor.css';

const Editor = () => {
  const {
    data: emotions,
    loading,
    error,
  } = useFetch('http://localhost:3000/emotions');

  return (
    <>
      <h2 className='editor'>Editor</h2>
      {emotions && emotions.map(emo => <p key={emo.id}>{emo.name}</p>)}
    </>
  );
};

export default Editor;
