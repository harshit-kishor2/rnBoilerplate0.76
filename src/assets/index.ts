//! ==============================================================================

import GIFS from './gif';
import IMAGES from './images';
import LOTTIES from './lottie';
import {SVGIcons} from './svg';

// Import all Fonts  from here
const FontConst = {
  Roboto: {
    light: 'Roboto-Light',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  Satoshi: {
    light: 'Satoshi-Light',
    regular: 'Satoshi-Regular',
    medium: 'Satoshi-Medium',
    bold: 'Satoshi-Bold',
  },
};


//! ==============================================================================
// Consolidated export for easier access
const Assets = {
  font: FontConst,
  lottie: LOTTIES,
  gif: GIFS,
  image: IMAGES,
  svg: SVGIcons,
};

export default Assets;