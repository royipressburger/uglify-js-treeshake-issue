import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { onePlusOne } from './ttt'

const render = () => {
  ReactDOM.render(
      <div> Hello World </div>,
    document.getElementById('root'),
  );
};

render();
