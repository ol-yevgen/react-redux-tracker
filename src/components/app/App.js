import './app.scss';
import Title from '../title/Title'
import TrackersForm from '../trackersForm/TrackersForm'

const App = () => {
    return (
        <div className="App">
            <Title />
            <TrackersForm/>
        </div>
    );
}

export default App;