import { ActionArgs, json } from '@remix-run/node';
import { db } from '~/lib/db.server';
import { sleep } from '~/lib/utils';

export type DeleteActionData = {
  message: string;
};

export const action = async ({ params, request }: ActionArgs) => {
  const formData = await request.formData();
  const mech = formData.get('mech')?.toString() ?? '';
  try {
    await db.mech.update({
      where: { id: parseInt(mech) },
      data: {
        isDeleted: true,
      },
    });
    return null;
  } catch {
    return json({ message: 'Goddamit, Ted.' });
  }
};
