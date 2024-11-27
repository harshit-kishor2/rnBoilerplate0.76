
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import registerScreenStyles from './RegisterScreen.style';
import {useAppTranslation} from '@app/i18n';

const useRegisterScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => registerScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useRegisterScreen;
