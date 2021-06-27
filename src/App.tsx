import React from 'react';

import './styles.scss';
import List from './components/list';
import InputTask from './components/inputTask';

function App() {
    return (
        <div className="container">
            <InputTask />
            <List />
        </div>
    );
}

export default App;
