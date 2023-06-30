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
const Logout = require('../controllers/logout');
const ProductDetails = require('../controllers/productDetails');
const productDisplay = require('../controllers/showAllProducts');
const GetCategory = require('../controllers/getCategory');
const AddCategory = require('../controllers/addCategory');
const ListCategory = require('../controllers/listCategory');
const UpdateCategory = require('../controllers/editCategory');
const DeleteCategory = require('../controllers/deleteCategory');
const InventoryStatus = require('../controllers/inventoryStatus');
const UpdateProducts = require('../controllers/editProducts');
const DeleteProduct = require('../controllers/deleteProducts');
const JSONToCSV = require('../controllers/jsonToCSV');
// const DateDetails = require('../controllers/createPeriod');
const TaxDetails = require('../controllers/createTaxForm');
const DisplayTax = require('../controllers/listAllTaxes');
const EditTaxDetails = require('../controllers/editTax');
const DeleteTax = require('../controllers/deleteMutlipleTax');
const SelectProduct = require('../controllers/selectProduct');
const TaxList = require('../controllers/dropdownTax');
const DeleteMultipleProducts = require('../controllers/deleteMultipleProducts');
const PlaceOrder = require('../controllers/placeOrder');
const DisplayOrders = require('../controllers/displayOrders');
const InvoiceDetails = require('../controllers/invoiceDetails');
const DisplayInvoice = require('../controllers/invoiceList');
const CustomerDetails = require('../controllers/customerDetails');
const ListCustomerDetails = require('../controllers/listCustomerDetails');
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
router.get('/logout', Authorize, Logout.logOutUser);
router.post('/addProduct', upload.array('image'), ProductDetails.addProductsList);
router.get('/displayProduct', productDisplay.displayAllProducts);
router.get("/getCategory", GetCategory.gettingCategories);
router.post("/addCategory", AddCategory.addingCategories);
router.get("/listCategory", ListCategory.listingCategories);
router.put('/listCategory/:id', UpdateCategory.editCategory);
router.patch('/deleteCategory', DeleteCategory.deleteCategories);
router.get("/status", InventoryStatus.inventoryStatus);
router.put('/display/:_id', UpdateProducts.editProducts);
router.get('/deleteProduct/:id', DeleteProduct.deleteProduct)
router.get("/convert", JSONToCSV.convertingToCSV);
// router.post('/date', DateDetails.getDateDetails);
router.post('/tax', TaxDetails.getTaxDetails);
router.get('/tax', DisplayTax.getAllTaxDisplay);
router.put('/tax/:_id', EditTaxDetails.taxEdit);
router.patch('/deleteTax', DeleteTax.deleteMultipleTaxes);
router.get('/select', SelectProduct.selectProductField);
router.get('/taxLists', TaxList.getTaxList);
router.patch('/deleteMultiple', DeleteMultipleProducts.deleteMultipleProducts)
router.post('/tax/order', PlaceOrder.getOrderPlaced);
router.get('/tax/order', DisplayOrders.displayAllOrders);
router.get('/tax/order/invoice', InvoiceDetails.detailsOfInvoice);
router.get('/tax/order/invoice', DisplayInvoice.displayAllInvoices);
router.post('/customerDetails', CustomerDetails.getCustomerDetails);
router.get('/customerDetails', ListCustomerDetails.customersListDetails)
// router.get('/employee/:id', NamesById.getAllTheNamesById);
// router.post('/role/addFields', AddFields.addFields);

module.exports = router;
