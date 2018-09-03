import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Bubbles from './Bubbles';

const data = [
  { id: 11, Name: 'Mashed Potatoes', Count: 10, category: 'general' },
  { id: 10, Name: 'Milk', Count: 9, category: 'general' },
  { id: 9, Name: 'Lettuce Salad', Count: 10, category: 'general' },
  { id: 8, Name: 'Chicken Salad', Count: 9, category: 'lifestyle' },
  { id: 7, Name: 'Boiled Potatoes', Count: 8, category: 'general' },
  { id: 6, Name: 'Vanilla Ice Cream', Count: 7, category: 'activity' },
  { id: 5, Name: 'Cocoa,Count', Count: 6, category: 'lifestyle' },
  { id: 4, Name: 'Lobster Salad', Count: 1, category: 'general' },
  { id: 3, Name: 'Chocolate,Count', Count: 4, category: 'lifestyle' },
  { id: 2, Name: 'Apple Pie,Count', Count: 3, category: 'general' },
  { id: 1, Name: 'Olives,Count', Count: 1, category: 'new category' },
];

const render = () => {
  ReactDOM.render(
    <Bubbles data={data} valueFieldName="Count" textFieldName="Name" minValue={1} maxValue={10} />,
    document.getElementById('root'),
  );
};

render();
