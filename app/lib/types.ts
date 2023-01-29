import { Prisma } from '@prisma/client';

export const MechDataInclude = Prisma.validator<Prisma.MechInclude>()({
  refits: true,
  player: true,
});

const MechData = Prisma.validator<Prisma.MechArgs>()({
  include: MechDataInclude,
});

export type MechData = Prisma.MechGetPayload<typeof MechData>;

export const refitDataInclude = Prisma.validator<Prisma.RefitInclude>()({
  mech: {
    include: { player: true },
  },
});

const refitData = Prisma.validator<Prisma.RefitArgs>()({
  include: refitDataInclude,
});

export type RefitData = Prisma.RefitGetPayload<typeof refitData>;
