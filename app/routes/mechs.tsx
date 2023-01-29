import { ActionArgs, json } from '@remix-run/node';
import { db } from '~/lib/db.server';

export type MechsActionData = {
  message: string;
};

const users = ['Empress', 'ArbitorFallen', 'TwigMaximus', 'Apostle13th'];

export const action = async ({ params, request }: ActionArgs) => {
  const formData = await request.formData();
  const model = formData.get('model')?.toString() ?? '';
  const cost = parseInt(formData.get('cost')?.toString() ?? '');
  const user = formData.get('user')?.toString() ?? '';
  const name = formData.get('name')?.toString() ?? '';
  const legacy = formData.get('legacy')?.toString() ?? '';

  if (model === '') {
    return json({ message: 'No model submitted' });
  }
  if (cost < 0) {
    return json({ message: 'Nice try.' });
  }
  if (!users.some((usr) => usr === user)) {
    return json({ message: 'Invalid user' });
  }
  const player = await db.player.findFirst({
    where: {
      username: user,
    },
  });
  if (player === null) {
    return json({ message: 'How did you manage this?' });
  }
  await db.mech.create({
    data: {
      model,
      claimValue: isNaN(cost) ? 0 : cost,
      totalValue: isNaN(cost) ? 0 : cost,
      name: name === '' ? null : name,
      playerId: player.id,
      claimTime:
        legacy === 'legacy' ? new Date(2023, 0, 27, 18, 0) : new Date(),
    },
  });
  await db.player.update({
    where: { id: player.id },
    data: {
      totalAssets: isNaN(cost) ? player.totalAssets : player.totalAssets + cost,
    },
  });
  return null;
};
