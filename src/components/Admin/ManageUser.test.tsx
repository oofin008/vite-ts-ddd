import { render, screen } from '@/utils/testUtils';
import { expect, vi } from 'vitest';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import { ListUsersResponse } from '@/core/domains/admin/firebaseAdminRepo';
import ManageUser from './ManageUser';

vi.mock('@/core/domains/admin/firebaseAdminImpl');
const mockFirebase = vi.mocked(firebaseAdminImpl);

describe('ManageUser', async () => {
  it('should render the table', () => {
    mockFirebase.listUsers.mockImplementation((params) => {
      const data: ListUsersResponse = {
        nextPageToken: 'token',
        response: [],
        total: 0,
      }
      return Promise.resolve(data);
    })
    render(
      <ManageUser/>,
    )
    expect(screen.getByText('ManageUser')).toBeInTheDocument()
  })
})
