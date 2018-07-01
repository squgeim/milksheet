import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

function App() {
    return <Routes />;
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
