import React from 'react';
import { MechData } from '~/lib/types';
import { getColor } from '~/lib/utils';
import { BiWrench } from 'react-icons/bi';
import { GiMineExplosion } from 'react-icons/gi';
import { useFetcher } from '@remix-run/react';
import { RefitActionData } from '~/routes/refits';
import { DeleteActionData } from '~/routes/mechs/delete';
import Spinner from '~/Components/Generic/Spinner';

interface Props {
  mech: MechData;
}

type ButtonPane = 'DELETE' | 'REFIT';

const MechRow: React.FC<Props> = (props) => {
  const { mech } = props;
  const [buttonPane, setButtonPane] = React.useState<ButtonPane | null>(null);
  const fetchRefit = useFetcher<RefitActionData | null>();
  const fetchDelete = useFetcher<DeleteActionData | null>();

  React.useEffect(() => {
    if (
      fetchRefit.type === 'done' &&
      fetchRefit.data === null &&
      buttonPane === 'REFIT'
    ) {
      setButtonPane(null);
    }
  });

  return (
    <div key={mech.id} className='mt-2 mb-1.5 rounded shadow-xl bg-slate-600'>
      <div className='flex flex-row px-1.5'>
        <p className='font-semibold mr-auto'>{mech.model}</p>
        <p className='font-semibold mr-1'>{`$${mech.totalValue} M`}</p>
      </div>
      <div className='flex flex-row px-1.5'>
        <p className='italic mr-auto'>{mech.name}</p>
        <div className='mr-1 flex flex-row'>
          <p
            className='font-semibold'
            style={{ color: getColor(mech.player.username) }}
          >{`${mech.player.username}`}</p>
        </div>
      </div>
      {buttonPane === 'DELETE' ? (
        <div className='flex flex-row text-sm bg-gradient-to-r from-red-200 to-red-500 py-1 px-1'>
          <p className='text-black'>Delete mech?</p>
          <button
            onClick={() =>
              fetchDelete.submit(
                { mech: mech.id.toString() },
                { method: 'delete', action: '/mechs/delete' }
              )
            }
            disabled={fetchDelete.state !== 'idle'}
            className='flex flex-row items-center ml-2 rounded shadow px-2 bg-red-700 hover:bg-red-500'
          >
            {fetchDelete.state !== 'idle' ? <Spinner /> : null}
            Confirm
          </button>
        </div>
      ) : null}
      {buttonPane === 'REFIT' ? (
        <fetchRefit.Form method='post' action='/refits'>
          <input type='hidden' name='mech' value={mech.id} />
          <div className='text-sm bg-gradient-to-r from-orange-200 to-orange-500 py-1 px-1'>
            <div>
              {fetchRefit.data !== null ? (
                <p className='text-red-600 font-semibold'>
                  {fetchRefit.data?.message}
                </p>
              ) : null}
              <input
                type='text'
                name='label'
                className='w-3/5 mb-1 pl-1 bg-slate-600 text-slate-100 placeholder-amber-100'
                placeholder='Refit Label'
              />
            </div>
            <div>
              <input
                type='cost'
                name='cost'
                className='w-3/5 mb-1 pl-1 bg-slate-600 text-slate-100 placeholder-amber-100'
                placeholder='Refit Cost'
              />
            </div>
            <div className='flex flex-row'>
              <p className='text-black'>Refit mech?</p>
              <button
                className='ml-2 flex flex-row items-center rounded shadow px-2 bg-orange-700 hover:bg-orange-500'
                disabled={fetchRefit.state !== 'idle'}
              >
                {fetchRefit.state !== 'idle' ? <Spinner /> : null}
                Confirm
              </button>
            </div>
          </div>
        </fetchRefit.Form>
      ) : null}
      <div className='flex flex-row'>
        <button
          className={`w-1/2 py-px ${
            buttonPane === 'DELETE' ? 'bg-red-500' : 'bg-red-600/80'
          } rounded-bl hover:bg-red-500 flex justify-center`}
          onClick={() =>
            setButtonPane(buttonPane === 'DELETE' ? null : 'DELETE')
          }
        >
          <GiMineExplosion />
        </button>
        <button
          onClick={() => setButtonPane(buttonPane === 'REFIT' ? null : 'REFIT')}
          className={`w-1/2 py-px ${
            buttonPane === 'REFIT' ? 'bg-orange-500' : 'bg-orange-600/80'
          } rounded-br hover:bg-orange-500 flex justify-center`}
        >
          <BiWrench />
        </button>
      </div>
    </div>
  );
};

export default MechRow;
