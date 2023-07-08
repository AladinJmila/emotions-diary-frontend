import './EmotionForm.css';
import { EmotionalState } from './EmotionalStateInput';
import { useState, useEffect } from 'react';

interface Props {
  emotionalState: EmotionalState | null | undefined;
}

const EmotionForm = ({ emotionalState }: Props) => {
  const [udpateData, setUpdateData] = useState<EmotionalState>();

  useEffect(() => {
    if (emotionalState) {
      setUpdateData(emotionalState);
    }
  }, [emotionalState]);

  const formatForTexarea = (data: string[]): string => {
    return data.map(d => `- ${d}`).join('\n');
  };
  if (emotionalState)
    return (
      <form onSubmit={e => console.log(e)} className='emo-form'>
        <fieldset>
          <div className='form-group '>
            <label className='col-sm-2 control-label '>Name</label>

            <input
              name='name'
              className='form-control'
              type='text'
              value={udpateData?.name}
            />
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Description</label>

            <textarea
              name='description'
              className='form-control'
              value={udpateData?.description}
            ></textarea>
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Energy</label>

            <input
              name='energy'
              className='form-control'
              type='number'
              value={udpateData?.energy}
            />
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Intensity</label>

            <input
              name='intensity'
              className='form-control'
              type='number'
              value={udpateData?.intensity}
            />
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Triggers</label>

            <textarea
              name='triggers'
              className='form-control'
              value={
                udpateData?.triggers && formatForTexarea(udpateData?.triggers)
              }
            ></textarea>
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Coping mechanisms</label>

            <textarea
              name='coping_mechanisms'
              className='form-control'
              value={
                udpateData?.copingMechanisms &&
                formatForTexarea(udpateData?.copingMechanisms)
              }
            ></textarea>
          </div>

          <div className='form-group '>
            <label className='col-sm-2 control-label '>Tags</label>

            <textarea
              name='tags'
              className='form-control'
              value={udpateData?.tags && formatForTexarea(udpateData?.tags)}
            ></textarea>
          </div>

          {/* <div className='form-actions'>
          <button
            className='btn btn-primary js-tooltip'
            title=''
            data-original-title='Make a PUT request on the Emotional State Instance resource'
          >
            PUT
          </button>
        </div> */}
        </fieldset>
      </form>
    );
};

export default EmotionForm;
