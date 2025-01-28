
import {AppButton, AppScrollView, AppTextInput, AppVectorIcon, Container, SizedBox} from '@app/components';
import {useAppLocalizationContext, useAppTranslation} from '@app/i18n';
import {useAppTheme, useAppThemeContext} from '@app/theme';
import React, {useMemo} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text} from 'react-native';

const HomeScreen: React.FC = () => {
  const {selectedThemeType,setSelectedThemeType} = useAppThemeContext();
  const {currentLanguage,setSelectedLanguageType, selectedLanguageType} = useAppLocalizationContext();

  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => homeScreenStyles(theme), [theme]);

  return (
    <Container>
      <KeyboardAvoidingView style={{flex:1}} behavior="padding">
        <AppScrollView >
          <Text style={styles.text} >HomeScreen</Text>
          <Text style={styles.text} >Theme : ${selectedThemeType}</Text>
          <SizedBox height={20}/>
          <AppButton outlined title="Dark Theme" onPress={()=>setSelectedThemeType('dark')} />
          <SizedBox height={20}/>
          <AppButton title="Light Theme" onPress={()=>setSelectedThemeType('light')} />
          <SizedBox height={20}/>
          <AppButton title="Auto Theme" onPress={()=>setSelectedThemeType('auto')} />
          <SizedBox height={20}/>
          <Text style={styles.text} >Langauge : ${currentLanguage} and ${selectedLanguageType} : ${translate('greeting')}</Text>
          <SizedBox height={20}/>
          <AppButton title="Set Language English" onPress={()=>setSelectedLanguageType('en')} />
          <SizedBox height={20}/>
          <AppButton title="Set Language Hindi" onPress={()=>setSelectedLanguageType('hi')} />
          <SizedBox height={20}/>
          <AppButton title="Auto Language" onPress={()=>setSelectedLanguageType('auto')} />
          <SizedBox height={20}/>
          <AppTextInput
            style={{width: 300}}
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
            leftIcon={<AppVectorIcon type='Feather' name="mail" />}
            rightIcon={<AppVectorIcon type='Feather' name="mail" />}
          />
          <SizedBox height={20}/>
          <AppTextInput
            style={{width: 300}}
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
          />

        </AppScrollView>
      </KeyboardAvoidingView>
    </Container>
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