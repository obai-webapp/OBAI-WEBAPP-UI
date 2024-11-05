// LandingPage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from './LandingPage';

test('renders landing page with important information text', () => {
    render(<LandingPage />);

    // Check if the "Important Information" heading is in the document
    expect(screen.getByText(/Important Information/i)).toBeInTheDocument();

    // Check if the first paragraph with specific text is in the document
    expect(
        screen.getByText(/To start your car claim submission, please use the specific link provided to you by our admin/i)
    ).toBeInTheDocument();

    // Check if the second paragraph with specific text is in the document
    expect(
        screen.getByText(/If you do not have this link, please check your email or contact our support team for assistance/i)
    ).toBeInTheDocument();
});
