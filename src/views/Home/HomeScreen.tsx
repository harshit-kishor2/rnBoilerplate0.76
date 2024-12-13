
import React from 'react';
import { View, Text } from 'react-native';
import useHomeScreen from './useHomeScreen';
import {useAppThemeContext} from '@app/theme/AppThemeProvider';
import {AppButton, Spacer} from '@app/components';
import {useAppLocalizationContext} from '@app/i18n/AppLocalizationProvider';

const HomeScreen = () => {
  const { styles, t } = useHomeScreen();
  const {selectedThemeType,setSelectedThemeType} = useAppThemeContext();
  const {currentLanguage,setSelectedLanguageType, selectedLanguageType} = useAppLocalizationContext();

  return (
    <View style={styles.container}>
      <Text style={styles.text} >HomeScreen</Text>
      <Text style={styles.text} >Theme : ${selectedThemeType}</Text>
      <AppButton title="Dark Theme" onPress={()=>setSelectedThemeType('dark')} />
      <Spacer/>
      <AppButton title="Light Theme" onPress={()=>setSelectedThemeType('light')} />
      <Spacer/>
      <AppButton title="Auto Theme" onPress={()=>setSelectedThemeType('auto')} />

      <Text style={styles.text} >Langauge : ${currentLanguage} and ${selectedLanguageType} : ${t('greeting')}</Text>
      <AppButton title="Set Language English" onPress={()=>setSelectedLanguageType('en')} />
      <Spacer/>
      <AppButton title="Set Language Hindi" onPress={()=>setSelectedLanguageType('hi')} />
      <Spacer/>
      <AppButton title="Auto Language" onPress={()=>setSelectedLanguageType('auto')} />

    </View>
  );
};

export default React.memo(HomeScreen);
