import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6d5b5900b24b5a",
    pass: "b9a300323ca5b2"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData){
  await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Vitor Hugo <vitorfrota.dev@gmail.com>',
      subject,
      html: body
    })
  }
}