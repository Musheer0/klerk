import * as React from 'react';

interface TwoFactorEnabledEmailTemplateProps {
  firstName: string;
  enableDate: string;
}

export const TwoFactorEnabledEmailTemplate: React.FC<TwoFactorEnabledEmailTemplateProps> = ({
  firstName,
  enableDate,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>Two-Factor Authentication Enabled</h1>
    <p style={styles.text}>
      Hi {firstName},<br />
      Two-factor authentication has been successfully enabled on your account as of {enableDate}. This adds an extra layer of security to your account.
    </p>
    <p style={styles.text}>
      If you did not initiate this, please contact our support team immediately.
    </p>
    <p style={styles.footer}>
      Stay secure,<br />
      The [Your Company Name] Team
    </p>
  </div>
);

// Inline styles
const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center' as const,
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #7dd3fc',
  },
  header: {
    color: '#0284c7',
    fontSize: '24px',
    marginBottom: '16px',
  },
  text: {
    color: '#333333',
    fontSize: '16px',
    marginBottom: '24px',
  },
  footer: {
    color: '#666666',
    fontSize: '14px',
    marginTop: '24px',
  },
};
