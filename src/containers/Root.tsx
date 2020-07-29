import React, { useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import store from '@redux/store';
import App from './App';
import { themeService } from '@core/ThemeService';
import GlobalBusyIndicator from '@components/GlobalBusyIndicator';
import { breachService } from '@core/BreachService';

function Root() {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    Promise.all([breachService.getBreaches(), themeService.init()]).then(() => {
      setShowApp(true);
    });
  }, []);

  if (!showApp) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={4000} placement="bottom-left">
        <App />
        <GlobalBusyIndicator />
      </ToastProvider>
    </ReduxProvider>
  );
}

export default Root;
