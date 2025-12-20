import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "../config/env";
import { logger } from "./logger";

export interface IMailOptions {
  subject: string;
  html: string;
}

export class MailTransporter {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = createTransport({
      service: env.MAIL.MAIL_SERVICE,
      host: env.MAIL.MAIL_HOST,
      port: env.MAIL.MAIL_PORT,
      secure: env.ENVIRONMENT === "production",
      auth: {
        user: env.MAIL.MAIL_USER,
        pass: env.MAIL.MAIL_PASS,
      },
    });
  }

  async verify(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info("Mail transporter is ready");
    } catch (error) {
      logger.error("Mail transporter verification failed", error);
    }
  }

  async sendMail(to: string, mailOptions: IMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({ 
        from: `"Real Estate App" <${env.MAIL.MAIL_USER}>`,
        to,
        subject: mailOptions.subject,
        html: mailOptions.html,
      });
    } catch (error) {
      logger.error("Failed to send mail", error);
      throw error;
    }
  }
}

export const mailTransporter = new MailTransporter();
  