import React from 'react';

import './styles.scss';

// import ComponentWithUseState from './components/ComponentWithUseState';
import MyComponent from './components/testPOST';
/*
const App: React.FC = () => (
    <div className="wrapper">
        <h1>React 17 and TypeScript 4 App!🚀</h1>
    </div>
);
*/

/*
ReactDOM.render(
  <React.StrictMode>
    <div>
      { <ComponentWithUseState /> }
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

function App() {
    return (
        <div>
            {/*  {<ComponentWithUseState />} */}
            {<MyComponent />}
            {/* <ControlledFormWithUseRef /> */}
            {/* <ComponentWithUseEffect /> */}
            {/* <ComponentWithCustomHook /> */}
            {/* <ComponentWithUseCallback /> */}
        </div>
    );
}

export default App;
