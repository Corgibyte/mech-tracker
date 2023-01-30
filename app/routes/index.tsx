import { Player } from '@prisma/client';
import { json, LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import Log from '~/Components/Log';
import MechDisplay from '~/Components/MechDisplay';
import PlayerDisplay from '~/Components/PlayerDisplay';
import { db } from '~/lib/db.server';
import {
  MechData,
  MechDataInclude,
  RefitData,
  refitDataInclude,
} from '~/lib/types';

type LoaderData = {
  players: Player[];
  mechs: MechData[];
  refits: RefitData[];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const players = await db.player.findMany({
    orderBy: { totalAssets: 'desc' },
  });
  const mechs = await db.mech.findMany({
    include: MechDataInclude,
    orderBy: {
      claimTime: 'asc',
    },
  });
  const refits = await db.refit.findMany({
    include: refitDataInclude,
    orderBy: {
      refitTime: 'asc',
    },
  });
  const data: LoaderData = {
    players,
    mechs,
    refits,
  };
  return json(data);
};

const IndexRoute: React.FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className='mx-3 mt-3'>
      <h1 className='text-amber-500 text-3xl font-semibold'>Honeyed Badgers</h1>
      <div
        className='grid w-full gap-x-4'
        style={{ gridTemplateColumns: 'minmax(max-content, 33%) 1fr' }}
      >
        <div>
          <PlayerDisplay players={data.players} />
          <MechDisplay
            mechs={data.mechs.map((mech) => ({
              ...mech,
              claimTime: new Date(mech.claimTime),
              refits: mech.refits.map((refit) => ({
                ...refit,
                refitTime: new Date(refit.refitTime),
              })),
            }))}
          />
        </div>
        <Log
          mechs={data.mechs.map((mech) => ({
            ...mech,
            claimTime: new Date(mech.claimTime),
            refits: mech.refits.map((refit) => ({
              ...refit,
              refitTime: new Date(refit.refitTime),
            })),
          }))}
          refits={data.refits.map((refit) => ({
            ...refit,
            refitTime: new Date(refit.refitTime),
            mech: { ...refit.mech, claimTime: new Date(refit.mech.claimTime) },
          }))}
        />
      </div>
    </div>
  );
};

export default IndexRoute;
