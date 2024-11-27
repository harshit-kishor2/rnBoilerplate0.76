
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import webviewScreenStyles from './WebviewScreen.style';
import {useAppTranslation} from '@app/i18n';

const useWebviewScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => webviewScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useWebviewScreen;
