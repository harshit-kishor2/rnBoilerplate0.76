import {Container} from '@app/components';
import AppWebView from '@app/components/atoms/AppWebView';
import AppHeader from '@app/components/ui/AppHeader';
import {useAppTranslation} from '@app/i18n';
import {useAppRoute} from '@app/navigation/hooks';
import React from 'react';

const WebViewScreen: React.FC = () => {
  const translate = useAppTranslation()
  const route = useAppRoute('WebViewRoute')
  const getTitle = (page?: IWebViewPages) : string => {
    switch (page) {
      case 't&c':
        return translate('webview_screen.t&c')
      case 'p&p':
        return translate('webview_screen.p&p')
      default:
        return '';
    }
  }

  return (
    <Container>
      <AppHeader title={getTitle(route.params?.page) ??''} />
      <AppWebView
        url='https://google.com'
      />
    </Container>
  );
}


export default WebViewScreen;