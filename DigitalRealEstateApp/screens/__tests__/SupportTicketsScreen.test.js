import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SupportTicketsScreen from '../SupportTicketsScreen';
import axios from 'axios';

jest.mock('axios');

describe('SupportTicketsScreen', () => {
  test('renders support tickets', async () => {
    const tickets = [
      { _id: '1', subject: 'Test Subject 1', message: 'Test Message 1', status: 'open' },
      { _id: '2', subject: 'Test Subject 2', message: 'Test Message 2', status: 'closed' }
    ];
    axios.get.mockResolvedValue({ data: tickets });

    const { getByText } = render(<SupportTicketsScreen />);

    await waitFor(() => {
      expect(getByText('Test Subject 1')).toBeTruthy();
      expect(getByText('Test Subject 2')).toBeTruthy();
    });
  });

  test('creates a new support ticket', async () => {
    axios.post.mockResolvedValue({ data: { _id: '3', subject: 'New Subject', message: 'New Message', status: 'open' } });

    const { getByPlaceholderText, getByText } = render(<SupportTicketsScreen />);
    fireEvent.changeText(getByPlaceholderText('Subject'), 'New Subject');
    fireEvent.changeText(getByPlaceholderText('Message'), 'New Message');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('New Subject')).toBeTruthy();
    });
  });
});