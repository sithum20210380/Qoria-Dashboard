import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store';
import ChartDashboard from './components/organisms/ChartDashboard';
import './App.css';

/**
 * Root application component
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
      >
        <div className="child-app">
          <ChartDashboard />
        </div>
      </ConfigProvider>
    </Provider>
  );
};

export default App;