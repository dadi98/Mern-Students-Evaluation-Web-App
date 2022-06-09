
import { render, screen, fireEvent } from '@testing-library/react';
//import AssignStudents from '../AssignStudents';
import CoursesComponent from '../CoursesComponent';

/*test('find apply button', async() => {
  render(<CoursesComponent />);
  const element = await screen.queryByRole("button");
  //expect(element.length).toBe(2);
  expect(element).toBeInTheDocument();
});*/

it('update select field', async() => {
  render(<CoursesComponent />);
  const element = screen.getByTitle('major select');
  fireEvent.change(element, {target: {value: 'L3'}})
  //expect(element.length).toBe(2);
  expect(element.value).toBe('L3');
});

it('update select field', async() => {
  render(<CoursesComponent />);
  const element1 = screen.getByTitle('major select');
  const element2 = screen.getByTitle('semester select');
  const buttonElement =  screen.getByRole("button", {name: 'Apply'});
  

  fireEvent.change(element1, {target: {value: 'L1'}})
  fireEvent.change(element2, {target: {value: '1'}})
  fireEvent.click(buttonElement)
  setTimeout(1000, () => {});
  
  
  expect(element1.value).toBe('L1');
  expect(element2.value).toBe('1');
  
  const element = await screen.findByTestId('button');
  expect(element).toBeInTheDocument();
  
});

