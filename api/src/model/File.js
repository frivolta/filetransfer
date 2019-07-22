import _ from 'lodash';

class File {
  constructor(app) {
    this.app = app;
    this.model = {
      name: null,
      orginalName: null,
      mimeType: null,
      filename: null,
      size: null,
      create: Date.now(),
    }
  }

  initWithObject(object) {
    this.model.name = _.get(object, 'name');
    this.model.orginalName = _.get(object, 'originalname');
    this.model.mimeType = _.get(object, 'mimetype');
    this.model.filename = _.get(object, 'filename');
    this.model.size = _.get(object, 'size');
    this.model.create = Date.now();
    return this.model;
  }

  save(callback) {
    const db = this.app.get('db');
    db.collection('files').insertOne(this.model, (err, res) => {
      return (callback, res);
    });
  }

  toJson(validModel) {
    console.log('returning: ', validModel)
    return validModel;
  }
}

export default File;