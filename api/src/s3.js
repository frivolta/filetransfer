import _ from 'lodash';
import { bucket } from './config';

export default class S3 {
  constructor(app, response) {
    this.app = app;
    this.response = response;
  }

  getObject(file) {
    const { s3 } = this.app;
    const options = {
      Bucket: bucket,
      Key: _.get(file, 'name'),
    };
    return s3.getObject(options).createReadStream();
  }

  download(file) {
    const { s3 } = this.app;

    // Get object from S3 service
    const filename = _.get(file, 'originalName');
    this.response.attachment(filename);
    const options = {
      Bucket: bucket,
      Key: _.get(file, 'name'),
    };
    const fileObject = s3.getObject(options).createReadStream();
    fileObject.pipe(this.response);
  }
}
