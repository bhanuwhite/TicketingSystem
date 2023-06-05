const router = require('express').Router();
const upload = require('../middlewares/upload');
const Authorize = require('../middlewares/authorization');
const Issues = require('../controllers/allIssues');
const TicketGenerate = require('../controllers/ticketGenerating');
const Employee = require('../controllers/employeeNames');
const CompanyDetails = require('../controllers/companyDetails');
const TopicDetails = require('../controllers/topicDetails');
const PopupDetails = require('../controllers/popupDetails');
const Assignee = require('../controllers/updateAssignee');
const AdminList = require('../controllers/adminList');
const SearchList = require('../controllers/searchTitle');
const Filter = require('../controllers/filteringData');
const Registration = require('../controllers/roleBasedRegistration');
const Login = require('../controllers/roleBasedLogin');
const Authorization = require('../controllers/authorizeUser');
const AddFields = require('../controllers/addFields');
const NamesById = require('../controllers/getEmployeeNamesById');

router.post('/users', upload.single('image'), TicketGenerate.generateTicket);
router.get('/users', Issues.getAllTheIssues);
router.get('/users/:company', Employee.getAllTheNames);
router.get('/companyNames', CompanyDetails.getAllTheCompanyNames);
router.get('/topic', TopicDetails.getAllTheTopics);
router.get('/popup/:id', PopupDetails.displayPopUpDetails);
router.put('/user/:id', Assignee.updateTheAssignee);
router.get('/admin', AdminList.getAdminList);
router.post('/search', SearchList.searchTitle);
router.get('/filter', Filter.filterTheData);
router.post('/role/register', Registration.registrationBasedRole);
router.post('/role/login', Login.loginBasedRole);
router.get('/role/protected', Authorize, Authorization.authorizeProtected);

// router.get('/employee/:id', NamesById.getAllTheNamesById);
// router.post('/role/addFields', AddFields.addFields);

module.exports = router;
