import * as React from 'react';

interface OtpEmailTemplateProps {
  firstName: string;
  otp: string;
  title: string; // Custom title for the email
  expirationTime: string; // Formatted expiration time
  otpLink?: string; // Optional link to the OTP page
}

export const OtpEmailTemplate: React.FC<OtpEmailTemplateProps> = ({
  firstName,
  otp,
  title,
  expirationTime,
  otpLink,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>{title}</h1>
    <p style={styles.text}>
      Hi {firstName},<br />
      Your One-Time Password (OTP) is <strong>{otp}</strong>.
      This code will expire in {expirationTime}. Please use it to complete your action.
    </p>
    {otpLink && (
      <p style={styles.text}>
        Click <a href={otpLink} style={styles.link}>here</a> to verify your OTP.
      </p>
    )}
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
  link: {
    color: '#0284c7',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    color: '#666666',
    fontSize: '14px',
    marginTop: '24px',
  },
};
