
import React from 'react';
import { View, Text } from 'react-native';
import useHomeScreen from './useHomeScreen';
import {useAppThemeContext} from '@app/store/context/ThemeContextProvider';
import {AppButton, Spacer} from '@app/components';
import {useAppLocalizationContext} from '@app/store/context/LocalizationContextProvider';

const HomeScreen = () => {
  const { styles, t } = useHomeScreen();
  const {selectedThemeType,setSelectedThemeType} = useAppThemeContext();
  const {currentLangauge,setSelectedLangaugeType, selectedLangaugeType} = useAppLocalizationContext();

  return (
    <View style={styles.container}>
      <Text style={styles.text} >HomeScreen</Text>
      <Text style={styles.text} >Theme : ${selectedThemeType}</Text>
      <AppButton title="Dark Theme" onPress={()=>setSelectedThemeType('dark')} />
      <Spacer/>
      <AppButton title="Light Theme" onPress={()=>setSelectedThemeType('light')} />
      <Spacer/>
      <AppButton title="Auto Theme" onPress={()=>setSelectedThemeType('auto')} />

      <Text style={styles.text} >Langauge : ${currentLangauge} and ${selectedLangaugeType} : ${t('welcome')}</Text>
      <AppButton title="Set Language English" onPress={()=>setSelectedLangaugeType('en')} />
      <Spacer/>
      <AppButton title="Set Language Hindi" onPress={()=>setSelectedLangaugeType('hi')} />
      <Spacer/>
      <AppButton title="Auto Language" onPress={()=>setSelectedLangaugeType('auto')} />

    </View>
  );
};

export default React.memo(HomeScreen);
