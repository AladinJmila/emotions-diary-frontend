import './EmotionForm.css';

const EmotionForm = () => {
  const foramtForTexarea = (data: string) => {
    return data
      .split('|')
      .map(d => `- ${d}`)
      .join('\n');
  };
  return (
    <form onSubmit={e => console.log(e)} className='emo-form'>
      <fieldset>
        <div className='form-group '>
          <label className='col-sm-2 control-label '>Name</label>

          <input
            name='name'
            className='form-control'
            type='text'
            value='Disappointed'
          />
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Description</label>

          <textarea name='description' className='form-control'>
            I'm not feeling great, my wife does not let me kiss her all I want.
            She seems busy and not wanting my attention.
          </textarea>
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Energy</label>

          <input
            name='energy'
            className='form-control'
            type='number'
            value='0.3'
          />
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Intensity</label>

          <input
            name='intensity'
            className='form-control'
            type='number'
            value='0.7'
          />
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Triggers</label>

          <textarea
            name='triggers'
            className='form-control'
            value={foramtForTexarea(
              "lack of physical affection|wife's busyness|feeling ignored"
            )}
          ></textarea>
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Coping mechanisms</label>

          <textarea
            name='coping_mechanisms'
            className='form-control'
            value={foramtForTexarea(
              'communicating with my wife about my feelings|engaging in personal hobbies and activities|seeking emotional support from friends or family'
            )}
          ></textarea>
        </div>

        <div className='form-group '>
          <label className='col-sm-2 control-label '>Tags</label>

          <textarea
            name='tags'
            className='form-control'
            value={foramtForTexarea(
              'disappointment|lack of intimacy|relationship issues'
            )}
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
