// app/ store/ProviderWrapper.js
'use client';

import { Provider } from 'react-redux';
import store from './store'; // Adjust the import path as necessary

const ProviderWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
