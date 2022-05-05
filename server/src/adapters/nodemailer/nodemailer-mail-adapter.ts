import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail-adapter";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "56059097792a97",
    pass: "3272db1a3e7232",
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Paula Bonini <paula_almeidabonini@hotmail.com>",
      subject,
      html: body,
    });
  }
}
