// Email service for sending notifications
// In a real implementation, you would integrate with services like:
// - SendGrid
// - AWS SES
// - Nodemailer with SMTP
// - Firebase Functions with email providers

export interface EmailData {
  to: string;
  subject: string;
  message: string;
  applicantName: string;
  status: 'selected' | 'rejected';
}

export const sendApplicationStatusEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would call your email service here
    console.log('Email sent:', {
      to: emailData.to,
      subject: emailData.subject,
      message: emailData.message,
      status: emailData.status
    });
    
    // For demo purposes, we'll always return success
    // In production, you would handle actual email sending and error cases
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Email templates
export const getEmailTemplate = (status: 'selected' | 'rejected', applicantName: string, customMessage?: string) => {
  const baseTemplate = {
    selected: {
      subject: 'Congratulations! Application Status Update - Junior Java Developer Position',
      defaultMessage: `Dear ${applicantName},

Congratulations! We are pleased to inform you that you have been selected for the Junior Java Developer position at Haryak Technologies India Private Limited.

We were impressed with your qualifications and believe you would be a great addition to our team in Chilakaluripet, Andhra Pradesh.

Our HR team will contact you within the next 2-3 business days with further details regarding:
- Joining date and formalities
- Salary and benefits discussion
- Relocation assistance (if needed)
- Required documentation

Thank you for your interest in joining Haryak Technologies. We look forward to welcoming you to our team!

Best regards,
HR Team
Haryak Technologies India Private Limited
www.haryak.com`
    },
    rejected: {
      subject: 'Application Status Update - Junior Java Developer Position',
      defaultMessage: `Dear ${applicantName},

Thank you for your interest in the Junior Java Developer position at Haryak Technologies India Private Limited and for taking the time to apply.

After careful consideration of all applications, we have decided to move forward with other candidates whose experience more closely matches our current requirements.

We appreciate the effort you put into your application and encourage you to apply for future opportunities that match your skills and experience.

We wish you the best of luck in your job search and future career endeavors.

Best regards,
HR Team
Haryak Technologies India Private Limited
www.haryak.com`
    }
  };

  return {
    subject: baseTemplate[status].subject,
    message: customMessage || baseTemplate[status].defaultMessage
  };
};