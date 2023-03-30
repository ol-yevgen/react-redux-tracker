import { configureStore } from '@reduxjs/toolkit';
import trackers from '../components/trackersList/trackersListSlice';

const stringMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action)
}

const store = configureStore({
    reducer: { trackers },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

