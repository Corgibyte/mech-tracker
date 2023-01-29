import { Player } from '@prisma/client';
import React from 'react';

interface Props {
  players: Player[];
}

const PlayerDisplay: React.FC<Props> = (props) => {
  const { players } = props;

  return (
    <div>
      <div className='p-2 my-2 rounded shadow-lg bg-slate-700 grid grid-cols-2 gap-x-10 gap-y-0.5'>
        <p className='text-amber-400 font-semibold'>Player</p>
        <p className='text-amber-400 font-semibold'>Total Assets</p>
        {players.map((player) => (
          <React.Fragment key={player.id}>
            <p>{player.username}</p>
            <p>{`$${player.totalAssets} M`}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PlayerDisplay;
