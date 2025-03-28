import * as nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

class SendMailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NEST_MAIL_HOST,
      port: Number(process.env.NEST_MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.NEST_MAIL_USER,
        pass: process.env.NEST_MAIL_PASS,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
    attachments?: Attachment[],
  ): Promise<void> {
    try {
      const mailOptions = {
        from: `"${process.env.NEST_PROJECT_NAME}" <${process.env.NEST_MAIL_USER}>`,
        to,
        subject,
        text,
        html,
        attachments,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}

export default SendMailProvider;
