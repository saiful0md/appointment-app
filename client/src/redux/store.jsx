
import { configureStore } from '@reduxjs/toolkit';
import { loadingSlice } from './Featurse/LoadingSlice';
import { userSlice } from './Featurse/UserSlice';


const store = configureStore({
  reducer: {
    alerts: loadingSlice.reducer,
    user: userSlice.reducer
  },
});

export default store;
