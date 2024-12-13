
import {useAppTheme} from '@app/theme/themes';
import {useMemo} from 'react';
import loginScreenStyles from './LoginScreen.style';
import {useAppTranslation} from '@app/i18n/utils';

const useLoginScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => loginScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useLoginScreen;
