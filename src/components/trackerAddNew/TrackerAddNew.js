import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { trackersCreated } from '../trackersList/trackersListSlice';

import Play from '../../assets/play-svgrepo-com-white.svg'
import './trackerAddNew.scss';

const TrackerAddNew = () => {
    const [trackerName, setTrackerName] = useState('');

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newTracker = {
            id: uuidv4(),
            name: trackerName,
            time: 0,
            play: true,
        }

        if (trackerName === '') {
            newTracker.name = moment().format('DD/MM/YYYY HH:mm')
        }

        request('https://trackers-mky8.onrender.com/trackers', 'POST', JSON.stringify(newTracker))
            .then(dispatch(trackersCreated(newTracker)))
            .catch(err => console.log(err))

        setTrackerName('');
    }

    return (
        <div className='add-container'>
            <form className='add' onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="Enter tracker name"
                    className='add-track'
                    id="name"
                    value={trackerName}
                    onChange={(e) => setTrackerName(e.target.value)}
                />
                <button
                    type="submit"
                    className='btn add-btn'
                >
                    <img src={Play} alt="play" />
                </button>
            </form>
        </div>
    )
}

export default TrackerAddNew;