import {Dimensions, PixelRatio} from 'react-native';
import config from "../config/config";

const { width: screenWidth } = Dimensions.get('window');
const designWidth = config.designWidth; // 设计稿的宽度

const px = size => {
  return PixelRatio.roundToNearestPixel((screenWidth / designWidth) * size);
};

global.px = px;
