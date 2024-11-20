import {Dimensions, PixelRatio} from 'react-native';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

// resolution changes as per design
export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 812;

const widthBaseScale = SCREEN_WIDTH / DESIGN_WIDTH;
const heightBaseScale = SCREEN_HEIGHT / DESIGN_HEIGHT;

const scale = Math.min(widthBaseScale, heightBaseScale);


function normalize(size: number, based = 'width') {
  const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
export const rpWidth = (size: number) => {
  return normalize(size, 'width');
};
//for height  pixel
export const rpHeight = (size: number) => {
  return normalize(size, 'height');
};
//for font  pixel
export const rpFont = (size: number) => {
  // return rpHeight(size);
  return Math.ceil(size * scale);
};

export const moderateScale = (size: number, factor = 1) => {
  return size + (rpWidth(size) - size) * factor;
};
