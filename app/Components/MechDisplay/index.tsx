import React from 'react';
import { MechData } from '~/lib/types';
import { getColor } from '~/lib/utils';
import AddMech from '../AddMech';
import MechRow from './MechRow';

interface Props {
  mechs: MechData[];
}

const MechDisplay: React.FC<Props> = (props) => {
  const { mechs } = props;

  return (
    <div className='p-2 my-2 rounded shadow-lg bg-slate-700'>
      <h1 className='text-amber-400 font-semibold text-lg'>Mechs</h1>
      {mechs
        .filter((mech) => !mech.isDeleted)
        .map((mech) => (
          <MechRow key={mech.id} mech={mech} />
        ))}
      <AddMech />
    </div>
  );
};

export default MechDisplay;
