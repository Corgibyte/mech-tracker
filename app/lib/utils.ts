export function getColor(username: string) {
  switch (username) {
    case 'Empress':
      return '#38bdf8';
    case 'ArbitorFallen':
      return '#a78bfa';
    case 'Apostle13th':
      return '#ef4444';
    case 'TwigMaximus':
      return '#ec4899';
  }
  return '#000000';
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
