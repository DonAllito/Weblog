const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const courseController = require('app/http/controllers/admin/courseController');

// validators 
const courseValidator = require('app/http/validators/courseValidator');

// Helpers
const upload = require('app/helpers/uploadImage');

// Middlewares
const convertFileToField = require('app/http/middleware/convertFileToField')

router.use((req , res , next) => {
    res.locals.layout = "admin/master";
    next();
})

// Admin Routes
router.get('/' , adminController.index);
router.get('/courses' , courseController.index);
router.get('/courses/create' , courseController.create);
router.post('/courses/create' ,
    upload.single('images') ,
    convertFileToField.handle ,
    courseValidator.handle() ,
    courseController.store
);
router.get('/courses/:id/edit' , courseController.edit);
router.put('/courses/:id' ,
    upload.single('images') ,
    convertFileToField.handle ,
    courseValidator.handle() ,    
    courseController.update
);
router.delete('/courses/:id' , courseController.destroy);

router.post('/upload-image' ,upload.single('upload') ,adminController.uploadImage);
module.exports = router;