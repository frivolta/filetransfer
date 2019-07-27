/** @format */
import path from 'path';
import _ from 'lodash';
import File from './model/File';

class AppRouter {
  constructor(app, db) {
    this.app = app;
    this.db = require("../config/keys").mongoURI;
    this.setupRouters();
  }

  setupRouters(db) {
    const app = this.app;
    const uploadDir = app.get('storageDir');
    const upload = app.get('upload');

    //GET '/' @public
    app.get("/", (req, res, next) => {
      return res.status(200).json({
        version: "1.0"
      });
    });

    //POST '/api/upload' @public 
    //Upload routing
    app.post("/api/upload", upload.array('files'), (req, res, next) => {
      const files = _.get(req, 'files', []);
      let fileModels = [];
      _.each(files, fileObject => {
        const newFile = new File(app).initWithObject(fileObject);
        fileModels.push(newFile);
      })
      if (fileModels.length) {
        console.log(this.db);
        this.db.collection('files').insertMany(fileModels, (err, result) => {
          if (err) {
            return res.status(503).json({
              error: {
                message: err.toString()
              }
            })
          }
          console.log("saved file", err, result)
          res.json({
            files: fileModels
          })

        })
      } else {
        return res.status(503).json({
          error: {
            message: "Files upload is required."
          }
        })
      }
      return res.json({
        files: fileModels
      })

    })

    //GET '/api/download/:token'
    //Download Routing
    app.get('/api/download/:name', (req, res, next) => {
      const fileName = req.params.name;
      const filePath = path.join(uploadDir, fileName);

      return res.download(filePath, fileName, (err) => {
        if (err) {
          return res.status(404).json({
            error: {
              message: "File not found."
            }
          })
        } else {
          console.log('File is downloaded.')
        }
      })
    })

    console.log("The app routing init.");
  }
}
export default AppRouter;
