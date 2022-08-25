import { CharacterType } from 'amongus-types';

const values: { [key: string]: HTMLImageElement } = {};

for (const val of Object.keys(CharacterType)) {
  for (const face of ['leftface', 'rightface']) {
    const elem = document.createElement('img');
    values[`${val}-${face}`] = elem;
    // hope theyre loaded by the time it tries to render them
    elem.src = `./assets/${val}/${face}.png`;
  }
}

const getImage = (val: CharacterType, face: 'leftface' | 'rightface') => {
  return values[`${val}-${face}`] ?? document.createElement('img');
};

export default getImage;
