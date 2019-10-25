import * as React from 'react';
import { render } from 'react-dom';
// import App from './components/organisms/App';
import Tree from './components/tree/Tree';
import registerServiceWorker from './registerServiceWorker';

// render(<App dataSource="./data/data.json" />, document.getElementById("root"));
render(<Tree url="./data/data.json" />, document.getElementById('root'));
registerServiceWorker();
