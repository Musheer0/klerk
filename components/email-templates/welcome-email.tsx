// WelcomeEmailTemplate.tsx

import * as React from 'react';

interface WelcomeEmailTemplateProps {
  firstName: string;
  verificationLink: string;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailTemplateProps> = ({
  firstName,
  verificationLink,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>Welcome, {firstName}!</h1>
    <p style={styles.text}>
      Thank you for signing up. Please verify your email address to get started.
    </p>
    <a href={verificationLink} style={styles.button}>
      Verify Email
    </a>
    <p style={styles.footer}>
      If you did not sign up for this account, you can safely ignore this email.
    </p>
  </div>
);

// Inline styles for the email template
const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center' as const,
    backgroundColor: '#f0f9ff', // Light background for the sky-500 theme
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #7dd3fc', // Border matching sky-500
  },
  header: {
    color: '#0284c7', // Sky-500 color for the header text
    fontSize: '24px',
    marginBottom: '16px',
  },
  text: {
    color: '#333333',
    fontSize: '16px',
    marginBottom: '24px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#0ea5e9', // Sky-500 color for the button
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold' as const,
  },
  footer: {
    color: '#666666',
    fontSize: '14px',
    marginTop: '24px',
  },
};
