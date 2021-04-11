const router = require('express').Router();
const passport = require('passport')
require('../config/passport-jwt')(passport);
const validatation = require('../config/inputValidation');

// For Teacher
const registerController = require('../controllers/teacher');
const loginController = require('../controllers/teacherlogin');

// For Country
const saveCountryController = require('../controllers/saveCountry');
const fetchCountryController = require('../controllers/fetchCountry');
const updateSingleCountryController = require('../controllers/updateCountry');
const deleteSingleCountryController = require('../controllers/deleteCountry');

// For State
const saveStateController = require('../controllers/saveState');
const fetchStateController = require('../controllers/fetchState');
const updateSingleStateController = require('../controllers/updateState');
const deleteSingleStateController = require('../controllers/deleteState');

// For Student
const saveStudentController = require('../controllers/saveStudent');
const loginStudentController = require('../controllers/loginStudent');
const fetchStudentController = require('../controllers/fetchStudent');
const updateSingleStudentController = require('../controllers/updateStudent');
const deleteSingleStudentController = require('../controllers/deleteStudent');

// For Class
const saveClassController = require('../controllers/saveClass');
const fetchClassController = require('../controllers/fetchClass');
const updateSingleClassController = require('../controllers/updateClass');
const deleteSingleClassController = require('../controllers/deleteClass');

// For Seeding
const seedingInDatabase = require('../controllers/seed');

// For Teacher
router.post('/',validatation.signup,registerController.saveUserRegistration);
router.post('/login',validatation.signup,loginController.loginUser);

// For Country Api
router.post('/save-country',passport.authenticate('jwt',{session:false}),saveCountryController.saveCountry);
router.get('/fetch-country',passport.authenticate('jwt',{session:false}),fetchCountryController.fetchCountry);
router.post('/update-country/:id',passport.authenticate('jwt',{session:false}),updateSingleCountryController.updateSingleCountry);
router.delete('/delete-country/:id',passport.authenticate('jwt',{session:false}),deleteSingleCountryController.deleteSingleCountry);

// For State Api
router.post('/save-state',passport.authenticate('jwt',{session:false}),saveStateController.saveState);
router.get('/fetch-state',passport.authenticate('jwt',{session:false}),fetchStateController.fetchState);
router.post('/update-state/:id',passport.authenticate('jwt',{session:false}),updateSingleStateController.updateSingleState);
router.delete('/delete-state/:id',passport.authenticate('jwt',{session:false}),deleteSingleStateController.deleteSingleState);

// For Student Api
router.post('/save-student',validatation.signup,saveStudentController.saveStudent);
router.post('/login-student',validatation.signup,loginStudentController.loginStudent);
router.get('/fetch-student/:id',passport.authenticate('jwt',{session:false}),fetchStudentController.fetchStudent);
router.post('/update-student/:id',passport.authenticate('jwt',{session:false}),updateSingleStudentController.updateSingleStudent);
router.delete('/delete-student/:id',passport.authenticate('jwt',{session:false}),deleteSingleStudentController.deleteSingleStudent);

// For Class Api
router.post('/save-class',passport.authenticate('jwt',{session:false}),saveClassController.saveClass);
router.get('/fetch-class',passport.authenticate('jwt',{session:false}),fetchClassController.fetchClass);
router.post('/update-class/:id',passport.authenticate('jwt',{session:false}),updateSingleClassController.updateSingleClass);
router.delete('/delete-class/:id',passport.authenticate('jwt',{session:false}),deleteSingleClassController.deleteSingleClass);


router.get('/seeding',seedingInDatabase.seeding);

module.exports = router;