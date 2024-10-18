import * as React from 'react';

interface OtpEmailTemplateProps {
  firstName: string;
  otp: string;
  title: string; // Custom title for the email
  expirationTime: string; // You can format this date/time as needed
}

export const OtpEmailTemplate: React.FC<OtpEmailTemplateProps> = ({
  firstName,
  otp,
  title,
  expirationTime,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>{title}</h1>
    <p style={styles.text}>
      Hi {firstName},<br />
      Your One-Time Password (OTP) is <strong>{otp}</strong>. 
      This code will expire in {expirationTime}. Please use it to complete your action.
    </p>
    <p style={styles.footer}>
      If you did not request this, please ignore this email.<br />
      Thank you!
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
