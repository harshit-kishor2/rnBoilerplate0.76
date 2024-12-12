
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import networkLoggerScreenStyles from './NetworkLoggerScreen.style';
import {useAppTranslation} from '@app/i18n/utils';

const useNetworkLoggerScreen = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => networkLoggerScreenStyles(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default useNetworkLoggerScreen;
