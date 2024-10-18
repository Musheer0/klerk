import * as React from 'react';

interface PasswordChangeEmailTemplateProps {
  firstName: string;
  changeDate: string; // You can format this date as needed
}

export const PasswordChangeEmailTemplate: React.FC<PasswordChangeEmailTemplateProps> = ({
  firstName,
  changeDate,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>Password Change Confirmation</h1>
    <p style={styles.text}>
      Hi {firstName},<br />
      Your password has been changed successfully on {changeDate}. If you did not initiate this change, please contact our support team immediately.
    </p>
    <p style={styles.text}>
      Thank you for keeping your account secure!
    </p>
    <p style={styles.footer}>
      Best regards,<br />
      The [Your Company Name] Team
    </p>
  </div>
);

// Inline styles for the email template
const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center' as const,
    backgroundColor: '#f0f9ff', // Light background for a clean look
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #7dd3fc', // Border matching sky-500 theme
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
  footer: {
    color: '#666666',
    fontSize: '14px',
    marginTop: '24px',
  },
};
