import { useHttp } from '../../hooks/http.hook';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    trackers: [],
    trackersLoadingStatus: 'idle'
}

export const fetchTrackers = createAsyncThunk(
    'trackers/fetchTrackers',
    () => {
        const { request } = useHttp();
        return request("https://trackers-mky8.onrender.com/trackers")
    }
)

const trackerSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        trackersFetching: state => { state.trackersLoadingStatus = 'loading' },
        trackersFetched: (state, action) => {
            state.trackers = action.payload
            state.trackersLoadingStatus = 'idle'
        },
        trackersFetchedError: state => {
            state.trackersFetchedError = 'error'
        },
        trackersCreated: (state, action) => {
            state.trackers.push(action.payload)
        },
        trackersChangeStatus: (state, action) => {
            state.trackers.filter(item => {
                if (item.id === action.payload) {
                    item.play = !item.play
                }
                return item.play
            })
        },
        trackersDelete: (state, action) => {
            state.trackers = state.trackers.filter(item => item.id !== action.payload)
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchTrackers.pending, state => { state.trackersLoadingStatus = 'loading' })
            .addCase(fetchTrackers.fulfilled, (state, action) => {
                state.trackers = action.payload
                state.trackersLoadingStatus = 'idle'
            })
            .addCase(fetchTrackers.rejected, state => {
                state.trackersLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const { actions, reducer } = trackerSlice;

export default reducer;
export const {
    trackersFetching,
    trackersFetched,
    trackersFetchedError,
    trackersCreated,
    trackersChangeStatus,
    trackersDelete
} = actions;