/** @format */
import path from 'path';
/* import _ from 'lodash';
import File from './model/File'; */

class AppRouter {
  constructor(app) {
    this.app = app;
    this.setupRouters();
  }

  setupRouters() {
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
      const files = req.files;
      return res.json({
        files
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
    /*  //POST '/api/upload' @public 
     //Upload routing
     app.post("/api/upload", upload.array('files'), (req, res, next) => {
       const files = _.get(req, 'files', []);
       console.log('files: ', files)
       let models = [];
       //Loop files and create model
       _.each(files, (fileObject) => {
         const newFile = new File(app).initWithObject(fileObject).toJson();
         models.push(newFile);
       })
       return res.json({
         files
       })
     }); */
    console.log("The app routing init.");
  }
}
export default AppRouter;
