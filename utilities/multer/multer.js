const multer  = require('multer');
const AppError = require('../handelError/appErrorClass');

const type= ['image/jpg' , 'image/png' , 'image/jpeg'];


exports.uploadSingleImage=(fieldName)=>{


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  function fileFilter (req, file, cb) {


    if (type.includes(file.mimetype)) 
        {
            cb(null,true)   
        }else
        {
            cb(new AppError("image only" ,400) , false)
        }  
  }
  
  const upload = multer({storage,fileFilter });

  return upload.single(fieldName);

}
exports.uploadArrayOfImage=(fieldName)=>{


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  function fileFilter (req, file, cb) {


    if (type.includes(file.mimetype)) 
        {
            cb(null,true)   
        }else
        {
            cb(new AppError("image only" ,400) , false)
        }  
  }
  
  const upload = multer({storage,fileFilter });

  return upload.array(fieldName);

}