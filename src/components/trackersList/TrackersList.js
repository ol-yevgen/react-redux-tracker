import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTrackers, trackersDelete, trackersChangeStatus } from './trackersListSlice';
import TrackersListItem from '../trackersListItem/TrackersListItem';

import './trackersList.scss';

const TrackersList = () => {
    const trackers = useSelector(state => state.trackers.trackers);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchTrackers());
        // eslint-disable-next-line
    }, []);

    const onChangeStatus = useCallback((id) => {
        const changeStatus = (arr) => {
            let a;
            arr.forEach(item => {
                if (item.id === id) {
                    
                    a = {
                        play: !item.play,
                    }
                }
            })
            return a
        }

        request(`https://trackers-mky8.onrender.com/trackers/${id}`, 'PATCH', JSON.stringify(changeStatus(trackers)))
            .then(dispatch(trackersChangeStatus(id)))
            .catch(err => console.log(err))
        // eslint-disable-next-line  
    }, [request])


    const onDelete = useCallback((id) => {
        request(`https://trackers-mky8.onrender.com/trackers/${id}`, 'DELETE')
            .then(dispatch(trackersDelete(id)))
            .catch(err => console.log(err))
        // eslint-disable-next-line  
    }, [request])

    const renderTrackersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center">No trackers</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <TrackersListItem
                key={id}
                id={id}
                {...props}
                onDelete={() => onDelete(id)} 
                onChangeStatus={() => onChangeStatus(id)}
                />
        }).reverse()
    }

    const elements = renderTrackersList(trackers)

    return (
        <ul className='trackers-list'>
            {elements}
        </ul>
    )
}

export default TrackersList;
