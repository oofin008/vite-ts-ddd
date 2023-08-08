import { render, screen } from '@/utils/testUtils';
import { expect } from 'vitest';
import ManageUser from './ManageUser';

describe('ManageUser', async () => {
  it('should render the table', () => {
    render(
      <ManageUser/>,
    )
    expect(screen.getByText('ManageUser')).toBeInTheDocument()
  })
})
