import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SupportTickets from '../SupportTickets';
import axios from 'axios';

jest.mock('axios');

describe('SupportTickets Component', () => {
  test('renders support tickets', async () => {
    const tickets = [
      { _id: '1', subject: 'Test Subject 1', message: 'Test Message 1', status: 'open' },
      { _id: '2', subject: 'Test Subject 2', message: 'Test Message 2', status: 'closed' }
    ];
    axios.get.mockResolvedValue({ data: tickets });

    render(<SupportTickets />);

    expect(await screen.findByText('Test Subject 1')).toBeInTheDocument();
    expect(screen.getByText('Test Subject 2')).toBeInTheDocument();
  });

  test('creates a new support ticket', async () => {
    axios.post.mockResolvedValue({ data: { _id: '3', subject: 'New Subject', message: 'New Message', status: 'open' } });

    render(<SupportTickets />);
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'New Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'New Message' } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText('New Subject')).toBeInTheDocument();
  });
});