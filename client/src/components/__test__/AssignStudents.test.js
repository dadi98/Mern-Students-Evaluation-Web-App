import { render, screen } from '@testing-library/react';
import AssignStudents from '../AssignStudents';

test('renders learn react link', async() => {
  render(<AssignStudents />);
  const element = screen.queryByTestId("form-check");
  expect(element).not.toBeInTheDocument();
});
