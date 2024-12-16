
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import loginScreenStyles from './LoginScreen.style';
import {useAppTranslation} from '@app/i18n';

const useLoginScreen = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => loginScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    translate
  };
};

export default useLoginScreen;
