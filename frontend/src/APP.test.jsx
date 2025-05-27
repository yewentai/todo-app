// frontend/src/App.test.jsx
import { vi } from 'vitest';
vi.mock('axios');

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

test('renders and adds a task', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    axios.post.mockResolvedValue({ data: { id: 1, title: 'Hello', completed: false } });
    fireEvent.change(screen.getByPlaceholderText(/enter a new task/i), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByText(/add/i));

    await waitFor(() => expect(screen.getByText('Hello')).toBeInTheDocument());
});
