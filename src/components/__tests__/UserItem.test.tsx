import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserItem } from '../UserItem';
import { AppContext } from '../../context/AppContext';
import { GitHubService } from '../../services/githubApi';
import type { GitHubUser } from '../../types/github';

// 1️⃣ Mock getUserRepos:
vi.mock('../../services/githubApi', () => ({
  GitHubService: {
    getUserRepos: vi.fn(),
  },
}));

describe('<UserItem />', () => {
  const mockUser: GitHubUser = {
    id: 1,
    login: 'gumthea',
  };

  const mockDispatch = vi.fn();

  const renderWithContext = (user: GitHubUser) =>
    render(
      <AppContext.Provider value={{ state: {}, dispatch: mockDispatch } as any}>
        <UserItem user={user} />
      </AppContext.Provider>
    );

  it('renders username & shows ChevronDown by default', () => {
    const { container } = renderWithContext(mockUser);
    expect(screen.getByText('gumthea')).toBeInTheDocument();

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows Loader2 when loading repos & calls GitHubService.getUserRepos', async () => {
    const fakeRepos = [{ id: 1, name: 'repo1', description: '', stargazers_count: 0 }];
    (GitHubService.getUserRepos as any).mockResolvedValueOnce(fakeRepos);

    const { container } = renderWithContext(mockUser);

    // Klik tombol untuk toggle
    fireEvent.click(screen.getByRole('button'));

    // Loader2 muncul:
    await waitFor(() => {
      const loader = container.querySelector('svg');
      expect(loader).toBeInTheDocument();
    });

    // Tunggu toggle selesai & repo terpasang:
    await waitFor(() => {
      expect(GitHubService.getUserRepos).toHaveBeenCalledWith('gumthea');
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_USER_REPOS',
        payload: { username: 'gumthea', repos: fakeRepos },
      });
    });
  });

  it('shows RepoList after toggle when repos available', async () => {
    const userWithRepos = {
      ...mockUser,
      repos: [{ id: 1, name: 'repo1', description: '', stargazers_count: 0 }],
    };

    renderWithContext(userWithRepos);

    // Klik tombol toggle → repos sudah ada → tidak fetch
    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('repo1')).toBeInTheDocument();
  });
});
