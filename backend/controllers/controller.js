const Ticket = require('../models/schema');
const Uploads = require('../models/imageSchema');
const multer = require('multer');
const Company = require('../models/CompanySchema');
const assert = require('assert');
const Topic = require('../models/topicSchema');
const Admin = require('../models/adminSchema');

var k=1;

// GENERATE THE TICKET RAISED
exports.generateTicket = async(req,res)=> {
    try
    {
      let payload = req.body;
      if(payload.type === 'client')
      {
        const ticket = new Ticket({
            type: payload.type,
            company: payload.company,
            employee: payload.employee,
            topic: payload.topic,
            title: payload.title,
            message: payload.message,
            status: payload.status,
            comment_count: payload.comment_count,
            view_count: payload.view_count,
            label: payload.label,
            priority: payload.priority,
            assignee: payload.assignee,
            reporter: payload.reporter,
            sprint: payload.sprint,
            Fix_version: payload.Fix_version,
            original_estimate: payload.original_estimate,
            components: payload.components,
            ticketId: payload.ticketId
        })
        if(req.file)
        {
          ticket.image = req.file.path;
        }
        Ticket.updateMany({}, { $set: { newField: true } },{upsert: false, multi: true});
        await ticket.save();
      
        let data= {
            message: "Ticket generated Successfully",
            statusCode: '201',
            type: payload.type,
            status: payload.status,
            image: ticket.image
        }
        return res.status(201).json({data});
      }

      else if(payload.type === 'internal')
      {
        const ticket = new Ticket({
            type: payload.type,
            admin: payload.admin,
            topic: payload.topic,
            title: payload.title,
            message: payload.message,
            status: payload.status,
            comment_count: payload.comment_count,
            view_count: payload.view_count,
            label: payload.label,
            priority: payload.priority,
            assignee: payload.assignee,
            reporter: payload.reporter,
            sprint: payload.sprint,
            Fix_version: payload.Fix_version,
            original_estimate: payload.original_estimate,
            components: payload.components,
            ticketId: payload.ticketId
        })
        await ticket.save();
        let data= {
            message: "Ticket generated Successfully",
            statusCode: '201',
            type: payload.type,
            status: payload.status
        }
        return res.status(201).json({data});
      }

      else
      {
        return res.status(400).json({message: "Invalid Ticket Type"})
      }
    }
     catch(err)
     {
        return res.status(400).send(err);
     }
}

// UPLOAD THE IMAGE
// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req,file,cb)=>{
//         const date = new Date().toISOString().replace(/:/g, '-');

//         cb(null, date + file.originalname);
//     },
//     });

//     const upload = multer({
//         storage: Storage,
//         limits: { fileSize: 5 * 1024 * 1024 }
//     }).single('testImage');

// exports.uploadImages = async(req,res)=>{
//     try
//     {
//         upload(req,res,(err)=> {
//             if(err) 
//             {
//                 if (err.code === 'LIMIT_FILE_SIZE') {
//                     return res.status(400).send({ message: 'File size exceeds the maximum limit.' });
//                   }
//                 console.log(err)
//             }
//             else
//             {
//                    const image = new Uploads({
//                     name: req.body.name,
//                     image:{
//                         data: req.filename,
//                         contentType:'image/png/jpg/jpeg' 
//                     },
                  
//                 });
//              if(req.file.mimetype=='image/jpg'|| req.file.mimetype=='image/png'||req.file.mimetype=='image/jpeg')
//              {
//                 image.save()
//                 .then(()=> res.send("Image Successfully uploaded..."))
//                 .catch((err)=> res.status(400).json(err.message));
//              }
//              else
//              {
//                return res.status(400).send({message:"File format not supported"})
//              }
               
//             }
//           })
//     }
//     catch(e)
//     {
//         return res.status(400).send(e);
//     }
// }

// GET ALL THE TICKET ISSUES RAISED
exports.getAllTheIssues = async(req,res)=>{
    try
    {
         let issuesDetails = await Ticket.find();
         return res.status(200).send(issuesDetails);
    }
     catch(e)
     {
        return res.status(400).send(e);
     }
}


//GET THE NAMES OF THE EMPLOYEES
 exports.getAllTheNames = async (req,res)=> {
try
 {
    const user = req.params.company;
    const company = await Ticket.find({ company: user }).select('-company').select('-topic').select('-title').select('-message').select('-status');
    if(company.length === 0)
    {
       return res.status(200).send("Incorrect company name")
    }
    res.json({company});
  } 
  catch (err) 
  {
    return res.status(500).json({ message: err.message });
  }
 }

// GET THE NAMES OF COMPANIES
exports.getAllTheCompanyNames = async (req,res)=> {   
try {

  const enumValues = Ticket.schema.path('company').enumValues;
  await Company.deleteMany();
  let Data = [];
  k=1;

  for (let i = 0; i < enumValues.length; i++) 
  {
    const result = await Ticket.aggregate([
      {
        $match: {
          company: enumValues[i],
          type: 'client'
        }
      },
      {
        $group: {
          _id: "$company",
          employeeNames: {
            $push: {
              id: "$_id",
              name: "$employee"
            }
          }
        }
      }
    ]).exec();

    //   companyData.push({
    //   id: k ,
    //   company: enumValues[i],
    //   employeeNames: result[0].employeeNames
    // });
  
      let company = new Company({
        id: k,
        company: enumValues[i],
        employeeNames: result[0].employeeNames
      })
    k++;
    Data.push(company);
    await company.save();
   
  }
   return  res.status(200).json({Data});
} 
catch (error) 
{
  console.error(error);
  return res.status(500).json({ error: 'An error occurred while storing the data' });
}
}


// GET ALL THE TOPICS LIST
exports.getAllTheTopics = async (req,res)=> {   
  try{
          let topicList, k=1;
          const distinctTopics = await Ticket.distinct('topic');
          await Topic.deleteMany();
    
            for(let i=0; i<distinctTopics.length ;i++)
            {
                 topicList = new Topic({
                 name: distinctTopics[i],
                 id: k
               }) 
               k++;
               await topicList.save();
            }
          const list = await Topic.find();
          return res.status(200).json({list});
  }
  catch(err)
  {
     return res.status(400).json(err.message);
  }
  
  }

// GET THE DETAILS OF THE POP-UP LIST ENTERED BY USING ID
  exports.displayPopUpDetails = async (req,res)=> {   
    try{
          let _id = req.params.id;
          const popUpList = await Ticket.find({_id}).select('-type').select('-company').select('-employee').select('-topic').select('-comment_count');  
          return res.status(200).send({popUpList});
      }
    catch(err)
    {
       return res.status(400).json(err.message);
    }
    
    }
  
// UPDATE THE ASSIGNEE 
    exports.updateTheAssignee = async (req,res)=> {   
      try{
            let _id = req.params.id;
            let assignee = req.body.assignee;
            let updated = await Ticket.updateOne({_id},{$set:{assignee: assignee}});
            return res.status(200).send({updated});
        }
      catch(err)
      {
         return res.status(400).json(err.message);
      }
      
      }
// ADMIN DROPDOWN LIST
exports.getAdminList = async (req,res)=> {   
  try{
      let admin;
      const enumValues = Ticket.schema.path('admin').enumValues;
      await Admin.deleteMany();

      for(let i=0;i<enumValues.length;i++)
      {
          admin = new Admin({
          name: enumValues[i]
        });
        await admin.save();
      }
       let list = await Admin.find();
       return res.status(200).json({data: list});

    }
  catch(err)
  {
     return res.status(400).json(err.message);
  }
  
  }

// SEARCH ACCORDING TO THE TITLE 
exports.searchTitle = async(req,res)=>{
  try
  {
    let title = req.body.title;
    const results = await Ticket.find({ title: { $regex: title, $options: 'i' } });
    return res.status(200).json({data: results});

  }
  catch(err)
  {
    return res.status(400).send(err);
  }
}

// FILTERING THE DATA ACCORDING TO THE STATUS
exports.filterTheData = async(req,res)=>{
  try
  {
    let status = req.query.status;
    const results = await Ticket.find({ status: status});
    return res.status(200).json({data: results});

  }
  catch(err)
  {
    return res.status(400).send(err);
  }
}
// GET THE EMPLOYEE DETAILS USING ID
// exports.getAllTheNamesById = async (req,res)=> {
//   try
//    {
//       const id = req.params.id;
//       const company = await Company.find({ id: id }).select('employeeNames').select('company');
//       // console.log(company)
//       if(company.length===0)
//       {
//           return res.status(200).send("Incorrect data")
//       }
//       res.json({company});
//     } 
//     catch (err) 
//     {
//       res.status(500).json({ message: err.message });
//     }
//    }