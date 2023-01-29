import { useFetcher } from '@remix-run/react';
import React from 'react';
import { MechsActionData } from '~/routes/mechs';

const AddMech: React.FC = (props) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const inputStyles = 'bg-slate-500 w-3/4 rounded text-slate-100 pl-1';
  const fetchMechAdd = useFetcher<MechsActionData | null>();

  React.useEffect(() => {
    if (fetchMechAdd.type === 'done' && fetchMechAdd.data === null) {
      setIsAdding(false);
    }
  }, [fetchMechAdd.data]);

  return (
    <>
      {isAdding ? (
        <fetchMechAdd.Form method='post' action='/mechs'>
          <div className='px-1.5 pb-1 pt-0.5 my-2 bg-slate-600 rounded shadow-lg'>
            <p className='font-semibold text-amber-400 text-lg'>Add New Mech</p>
            <hr className='mb-1.5 border-amber-400' />
            {fetchMechAdd.data ? (
              <p className='text-rose-400'>{fetchMechAdd.data.message}</p>
            ) : null}
            <div>
              <input
                type='text'
                name='model'
                className={inputStyles}
                placeholder='Mech Model'
              />
            </div>
            <div className='mt-1.5'>
              <input
                type='text'
                name='name'
                className={inputStyles}
                placeholder='Mech Nickname'
              />
            </div>
            <div className='my-1.5'>
              <input
                type='number'
                name='cost'
                className={inputStyles}
                placeholder='Mech Cost'
              />
            </div>
            <div>
              <select
                name='user'
                className='bg-slate-500 rounded text-slate-100 w-3/4 py-0.5'
              >
                <option value=''>Select mercenary...</option>
                <option value='Empress'>Empress</option>
                <option value='ArbitorFallen'>ArbitorFallen</option>
                <option value='Apostle13th'>Apostle13th</option>
                <option value='TwigMaximus'>TwigMaximus</option>
              </select>
            </div>
            <div className='my-1 ml-0.5'>
              <label className='text-slate-100 mr-1'>Legacy mech?</label>
              <input type='checkbox' name='legacy' value='legacy' />
            </div>
            <div className='mb-1 flex flex-row'>
              <button
                type='submit'
                className='px-2 mt-2 border-transparent rounded bg-amber-400 hover:bg-amber-300 text-black'
              >
                Save Mech
              </button>
              <button
                className='px-2 mt-2 ml-auto border-transparent rounded bg-zinc-400 hover:bg-zinc-300 text-black'
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </fetchMechAdd.Form>
      ) : (
        <button
          className='px-2 mt-2 border-transparent rounded bg-amber-400 hover:bg-amber-300 text-black'
          onClick={() => setIsAdding(true)}
        >
          New Mech
        </button>
      )}
    </>
  );
};

export default AddMech;
