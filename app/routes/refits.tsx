import { ActionArgs, json } from '@remix-run/node';
import { db } from '~/lib/db.server';

export type RefitActionData = {
  message: string;
};

export const action = async ({ params, request }: ActionArgs) => {
  const formData = await request.formData();
  const label = formData.get('label')?.toString() ?? '';
  let cost = parseFloat(formData.get('cost')?.toString() ?? '');
  const mech = formData.get('mech')?.toString() ?? '';

  if (label === '') {
    return json({ message: 'No label submitted' });
  }
  if (isNaN(cost)) {
    return json({ message: 'No cost submitted.' });
  }
  if (cost < 0) {
    return json({ message: 'Nice try.' });
  }
  const mechCheck = await db.mech.findFirst({
    where: {
      id: parseInt(mech),
    },
  });
  if (mechCheck === null) {
    return json({ message: 'How did you manage this?' });
  }
  await db.mech.update({
    where: {
      id: mechCheck.id,
    },
    data: {
      refits: {
        create: {
          label,
          cost,
        },
      },
      totalValue: mechCheck.totalValue + cost,
    },
  });
  const player = await db.player.findFirstOrThrow({
    where: { id: mechCheck.playerId },
  });
  await db.player.update({
    where: { id: mechCheck.playerId },
    data: {
      totalAssets: player.totalAssets + cost,
    },
  });
  return null;
};
