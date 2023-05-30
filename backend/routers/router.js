const router = require('express').Router();
const controller = require('../controllers/controller');
const upload = require('../middlewares/upload');

router.post('/users',upload.single('image'), controller.generateTicket);
// router.post('/upload',controller.uploadImages);
router.get('/users', controller.getAllTheIssues);
router.get('/users/:company', controller.getAllTheNames);
router.get('/companyNames', controller.getAllTheCompanyNames);
router.get('/topic', controller.getAllTheTopics);
router.get('/user/:id', controller.displayPopUpDetails);
router.put('/user/:id', controller.updateTheAssignee);
router.get('/admin', controller.getAdminList);
router.post('/search', controller.searchTitle);
router.get('/filter', controller.filterTheData);
// router.get('/users/:id', controller.getAllTheNamesById);

module.exports = router;
