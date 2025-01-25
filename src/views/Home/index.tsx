
import {AppButton, Spacer} from '@app/components';
import {useAppLocalizationContext, useAppTranslation} from '@app/i18n';
import {useAppTheme, useAppThemeContext} from '@app/theme';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';


const HomeScreen = () => {
  const {selectedThemeType,setSelectedThemeType} = useAppThemeContext();
  const {currentLanguage,setSelectedLanguageType, selectedLanguageType} = useAppLocalizationContext();

  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => homeScreenStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text} >HomeScreen</Text>
      <Text style={styles.text} >Theme : ${selectedThemeType}</Text>
      <AppButton title="Dark Theme" onPress={()=>setSelectedThemeType('dark')} />
      <Spacer/>
      <AppButton title="Light Theme" onPress={()=>setSelectedThemeType('light')} />
      <Spacer/>
      <AppButton title="Auto Theme" onPress={()=>setSelectedThemeType('auto')} />

      <Text style={styles.text} >Langauge : ${currentLanguage} and ${selectedLanguageType} : ${translate('greeting')}</Text>
      <AppButton title="Set Language English" onPress={()=>setSelectedLanguageType('en')} />
      <Spacer/>
      <AppButton title="Set Language Hindi" onPress={()=>setSelectedLanguageType('hi')} />
      <Spacer/>
      <AppButton title="Auto Language" onPress={()=>setSelectedLanguageType('auto')} />

    </View>
  );
};

export default HomeScreen;

const homeScreenStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.red,
    }
  });