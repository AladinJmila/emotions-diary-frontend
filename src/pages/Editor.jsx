import { useEmotions } from '../hooks/useEmotions';
import './Editor.css';

const Editor = () => {
  const { emotions, loadEmotions } = useEmotions();
  loadEmotions();

  return (
    <>
      <h2 className='editor'>Editor</h2>
      {emotions && emotions.map(emo => <p key={emo.id}>{emo.name}</p>)}
    </>
  );
};

export default Editor;
