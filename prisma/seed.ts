import { db } from '../app/lib/db.server';

const seedMechs = async () => {
  const empress = await db.player.create({
    data: {
      username: 'Empress',
      totalAssets: 10.1,
    },
  });
  const twig = await db.player.create({
    data: {
      username: 'TwigMaximus',
      totalAssets: 0,
    },
  });
  const apostle = await db.player.create({
    data: {
      username: 'Apostle13th',
      totalAssets: 20.6,
    },
  });
  const arbitor = await db.player.create({
    data: {
      username: 'ArbitorFallen',
      totalAssets: 15.4,
    },
  });

  //Mechs
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 0),
      model: 'Atlas AS7-D-H',
      claimValue: 0,
      totalValue: 0,
      playerId: twig.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 1),
      model: 'Thunderbolt TDR-5SD',
      claimValue: 0,
      totalValue: 0,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 2),
      model: 'King Crab KGC-000B',
      name: 'Krabby Pattie',
      claimValue: 0,
      totalValue: 0,
      playerId: apostle.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 3),
      model: 'Grasshopper GHR-5H',
      claimValue: 0,
      totalValue: 0,
      playerId: arbitor.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 4),
      model: 'Archer ARC-2P',
      claimValue: 0,
      totalValue: 0,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 5),
      model: 'Javelin JVN-HT',
      claimValue: 0,
      totalValue: 0,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 28, 10, 0),
      model: 'Charger CGR-1A1',
      claimValue: 6.5,
      totalValue: 6.5 + 2.8,
      playerId: arbitor.id,
      refits: {
        create: {
          label: 'No label',
          cost: 2.8,
        },
      },
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 28, 10, 1),
      model: 'Cyclops CP-10-Z',
      claimValue: 6.0,
      totalValue: 6.0 + 3.8 + 3.4,
      refits: {
        create: [
          {
            label: 'No label',
            cost: 3.8,
          },
          {
            label: 'Includes Long Tom Art Level 3',
            cost: 3.4,
          },
        ],
      },
      playerId: apostle.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 28, 10, 2),
      model: 'Panther PNT-KK',
      claimValue: 6.2,
      totalValue: 6.2,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 28, 10, 3),
      model: 'Thunderbolt TDR-5S-T',
      claimValue: 6.1,
      totalValue: 6.1,
      playerId: arbitor.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 28, 10, 4),
      model: 'Urbanmech UM-K9',
      claimValue: 2.9,
      totalValue: 2.9,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 29, 13, 0),
      model: 'Atlas AS7-P',
      claimValue: 8.4,
      totalValue: 8.4,
      playerId: empress.id,
    },
  });
  await db.mech.create({
    data: {
      claimTime: new Date(2023, 0, 27, 18, 0),
      model: 'Champion CHP-1NB',
      claimValue: 0,
      totalValue: 1,
      refits: {
        create: {
          label: 'Replace ER PPC with ER L Lasers',
          cost: 1,
        },
      },
      playerId: empress.id,
    },
  });
};

const seed = async () => {
  seedMechs();
};

seed().then(() => console.log('Complete'));
