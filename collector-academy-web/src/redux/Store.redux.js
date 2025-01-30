import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './reducers/_Root.reducer';
import rootSaga from './sagas/_Root.saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'token', 'user', 'users', 'courses', 'allocation', 'myCourses']
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
