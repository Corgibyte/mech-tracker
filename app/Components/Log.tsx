import React from 'react';
import { MechData, RefitData } from '~/lib/types';

interface Props {
  mechs: MechData[];
  refits: RefitData[];
}

interface Event {
  label: string;
  time: Date;
}

const Log: React.FC<Props> = (props) => {
  const { mechs, refits } = props;

  let events: Event[] = mechs.map((mech) => ({
    label: `${mech.player.username} claimed ${
      mech.model
    } for $${mech.claimValue.toLocaleString()} M`,
    time: mech.claimTime,
  }));
  const refitEvents = refits.map((refit) => ({
    label: `${refit.mech.player.username} refits ${
      refit.mech.model
    } for $${refit.cost.toLocaleString()} M: ${refit.label}`,
    time: refit.refitTime,
  }));
  events = [...events, ...refitEvents];

  return (
    <div className='p-2 my-2 rounded bg-slate-700 shadow-lg'>
      <p className='text-lg font-semibold text-amber-400'>Log</p>
      <div
        className='mt-1 grid gap-x-10 gap-y-1'
        style={{ gridTemplateColumns: 'max-content 1fr' }}
      >
        {events
          .sort((a, b) => a.time.getTime() - b.time.getTime())
          .map((event) => (
            <React.Fragment key={event.time.getTime()}>
              <div>
                <p>{event.time.toLocaleString()}</p>
              </div>
              <div>
                <p>{event.label}</p>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Log;
