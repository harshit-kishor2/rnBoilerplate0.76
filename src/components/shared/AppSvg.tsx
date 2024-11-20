import {SVGIcons, SVGIconsMapper} from '@app/assets/svg';
import {SvgProps} from 'react-native-svg';
import React from 'react';
type SVGIconProps = SvgProps & {
  icon: SVGIcons;
  height?: number | string;
  width?: number | string;
  pathFill?: string;
};

const AppSvg: React.FC<SVGIconProps> = (props) => {
  const {icon, pathFill = '#FFF'} = props;
  const IconsImage = SVGIconsMapper[icon];

  return <IconsImage pathFill={pathFill} {...props} />;
};

export default AppSvg;


// Use->
{/* <AppSvg icon={Assets.svg.APP} height={30} width={30} /> */}