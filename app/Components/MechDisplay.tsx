import React from 'react';
import { MechData } from '~/lib/types';
import { getColor } from '~/lib/utils';
import AddMech from './AddMech';

interface Props {
  mechs: MechData[];
}

const MechDisplay: React.FC<Props> = (props) => {
  const { mechs } = props;

  return (
    <div className='p-2 my-2 rounded shadow-lg bg-slate-700'>
      <h1 className='text-amber-400 font-semibold text-lg'>Mechs</h1>
      {mechs.map((mech) => (
        <div
          key={mech.id}
          className='mt-2 pl-1 rounded shadow-inner bg-slate-600'
        >
          <div className='flex flex-row'>
            <p className='font-semibold mr-auto'>{mech.model}</p>
            <p className='font-semibold mr-1'>{`$${mech.totalValue} M`}</p>
          </div>
          <div className='flex flex-row'>
            <p className='italic mr-auto'>{mech.name}</p>
            <p
              className='font-semibold mr-1'
              style={{ color: getColor(mech.player.username) }}
            >{`${mech.player.username}`}</p>
          </div>
        </div>
      ))}
      <AddMech />
    </div>
  );
};

export default MechDisplay;
