import { useHttp } from '../../hooks/http.hook';
import { useState, useEffect } from 'react';

import Play from '../../assets/play-svgrepo-com.svg';
import Pause from '../../assets/pause-svgrepo-com.svg';
import Minus from '../../assets/minus-svgrepo-com.svg';
import './trackersListItem.scss';

const TrackersListItem = ({ name, time, play, onDelete, onChangeStatus, id }) => {

    const [timeTracker, setTime] = useState(0)
    const { request } = useHttp();

    useEffect(() => {
        let interval = null;

        if (play) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
                request(`https://trackers-mky8.onrender.com/trackers/${id}`, 'PATCH', JSON.stringify({ time: time + timeTracker + 1}))
                    .catch(err => console.log(err))
            }, 1000)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)

    }, [play, id, timeTracker, request, time])

    const totalTime = time + timeTracker

    return (
        <li className={play ? 'track active' : 'track'}>
            <div className='track-desc'>
                <h2 className='track-desc--name'>{name}</h2>
                <div className='track-desc--time'>
                    <span>{('0' + Math.floor((totalTime / 3600) % 60)).slice(-2)}:</span>
                    <span>{('0' + Math.floor((totalTime / 60) % 60)).slice(-2)}:</span>
                    <span>{('0' + (totalTime) % 60).slice(-2)}</span>
                </div>
            </div>
            <div className='track-actions'>
                <button
                    className='btn btn-action btn-start'
                    onClick={onChangeStatus}
                >
                    <img src={play ? Pause : Play} alt="play/stop" />
                </button>
                <button
                    className='btn btn-action btn-delete'
                    onClick={onDelete}
                >
                    <img src={Minus} alt="delete" />
                </button>
            </div>

        </li>
    )
}

export default TrackersListItem;