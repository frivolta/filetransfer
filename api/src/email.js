import _ from 'lodash';
import { url } from './config';

export default class Email {
  constructor(app) {
    this.app = app;
  }

  sendDownloadLink(post, callback = () => { }) {
    const app = this.app;
    const email = app.email;
    const from = _.get(post, 'from');
    const to = _.get(post, 'to');
    const message = _.get(post, 'message', '');
    const postId = _.get(post, '_id');
    const downloadLink = `${url}/share/${postId}`;
    const messageOptions = {
      from, // sender address
      to, // list of receivers
      subject: '[SHARE] Download Invitation', // Subject line
      text: message, // plain text body
      html: `<p>${from} has sent you a file. Click <a href="${downloadLink}">here</p> to download. <p>Message: ${message}</p>`, // html body
    };
    // send mail with defined transport object
    email.sendMail(messageOptions, (error, info) => callback(error, info));
  }
}
