import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

// Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them.
const testShowData = {
 image: null,
 name: "test name",
 summary: "test summary",
 seasons: [
  {
   id: 1,
   name: "test season 1",
   episodes: []
  },
  {
   id: 2,
   name: "test season 2",
   episodes: []
  },
  {
   id: 3,
   name: "test season 3",
   episodes: []
  }
 ]
}

// Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
test('renders without errors', () => {
 render(<Show Show={testShowData} selectedSeason={'none'}/>);
});

// Test that the Loading component displays when null is passed into the show prop.
test('renders Loading component when prop show is null', () => {
 render(<Show Show={null} selectedSeason={'none'}/>);
 const loading = screen.queryByTestId('loading-container');
 expect(loading).toBeInTheDocument();
});

// Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
test('renders same number of options seasons are passed in', () => {
 render(<Show show={testShowData} selectedSeason={'none'}/>);
 const seasons = screen.queryAllByTestId('season-option');
 console.log(seasons);
 expect(seasons).toHaveLength(3);
});

// Test that when an item is selected, the handleSelect function is called.
test('handleSelect is called when a season is selected', async () => {
 const testHandler = jest.fn();
 render(<Show handleSelect={testHandler} show={testShowData} selectedSeason={'none'}/>);
 const select = screen.querySelector('#seasons');
 userEvent.click(select);
 const season1 = screen.getByRole('option', {  name: /season 1/i});
 userEvent.click(season1);
 await expect(testHandler).toBeCalled();
});

// Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
test('component renders when no seasons are selected and when rerenders with a season passed in', () => {

});
