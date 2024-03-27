import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import asynchandler from'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import Shop from '../models/shopModel.js'

dotenv.config();


// @desc register user/set token
// route POST /api/users/register
// @access User
const registerUser = asynchandler(async(req,res) => {
    const {name,email,password,role}=req.body;
    const userExists =await User.findOne({email})
    if (userExists){
        res.status(400);
        throw new Error("user alredy exists");
    }
    
    const user =await User.create({
        name,
        email,
        password,
        role

    })

    if (user){
        generateToken(res,user.id)
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role
    
        })

        //user.email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL,
              pass: process.env.PASS   
            }

          });
          
          var mailOptions = {
            from : 'fitarservice@gmail.com',
            to : user.email ,
            subject : 'Message From FITAR New Registration',
            html : `
            <h2><center>Welcome to the FITAR,Mr/Ms/Mrs ${user.name}!<center/></h2>
            <hr><br>
            <p><center><b>We are delighted to have you as part of our community.<b/><center/></p>
            <p><center><b>Here's a warm welcome to our business family.<b/><center/></p>
            
            <center><img src="https://cdn-icons-png.flaticon.com/512/5371/5371115.png?ga=GA1.1.1144847463.1704908368&" alt="Welcome Photo" style="width:200px; height: 200px;"/><center/>
      
            <pw><b>If you have any questions or need assistance, feel free to reach out to us.<b/></p>
            
            <p><b>Best regards,<br/>Your Business Name Team<b/></p>

            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('id sent: ' + info.response);
            }
          });
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')

    }
    res.status (200).json({ message: `${user.name}+Successfully Registered` });
  
});


// register shop/
// route POST /api/users/shop
// @access User
// const registerShop = asynchandler(async(req,res) => {
//     const {
//         ownername,
//         owneraddress,
//         ownerphonenumber,
//         owneremail,
//         shopname,
//         shopaddress,
//         shopphonenumber,
//         shopwebsiteURL
//     }=req.body;

//     const ShopExists =await Shop.findOne({owneremail})
//     if (ShopExists){
//         res.status(400);
//         throw new Error("alredy use this id");
//     }
   
//     const shop =await Shop.create({
//         ownername,
//         owneraddress,
//         ownerphonenumber,
//         owneremail,
//         shopname,
//         shopaddress,
//         shopphonenumber,
//         shopwebsiteURL 

//     })

//     if (shop){
//         res.status(201).json({
//             id:shop.id,
//             ownername:shop.ownername,
//             owneraddress:shop.owneraddress,
//             ownerphonenumber:shop.ownerphonenumber,
//             owneremail:shop.owneremail,
//             shopname:shop.shopname,
//             shopaddress:shop.shopaddress,
//             shopphonenumber:shop.shopphonenumber,
//             shopwebsiteURL:shop.shopwebsiteURL

//         })

//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: process.env.GMAIL,
//               pass: process.env.PASS   
//             }

//           });
          
//           var mailOptions = {
//             from : process.env.COMPANY,
//             to : process.env.ADMIN,
//             subject : 'Message From Client New Shop Registration',
//             html : `
//             <ul type="none" >
//             <li><p><b>shopid:${shop.id}</b></p></li>
//             <li><p><b>shop_owneraame:${shop.ownername}</b></p></li>
//             <li><p><b>shop_owneraddress:${shop.owneraddress}</b></p></li>
//             <li><p><b>shop_ownerphonenumber:${shop.ownerphonenumber}</b></p></li>
//             <li><p><b>shop_owneremail:${shop.owneremail}</b></p></li>
//             <li><p><b>shop_shopname:${shop.shopname}</b></p></li>
//             <li><p><b>shop_shopaddress:${shop.shopaddress}</b></p></li>
//             <li><p><b>shop_shopphonenumber:${shop.shopphonenumber}</b></p></li>
//             <li><p><b>shop_shopwebsiteURL:${shop.shopwebsiteURL}</b></p></li>
//             </ul>
//             `
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               // console.log('id sent: ' + info.response);
//             }
//           });

//     }
//     else{
//         res.status(400)
//         throw new Error('Invalid shop data')

//     }
//     res.status (200).json({ message: 'Successfully Registered Shops' });
     
  
// });


const registerShop = asynchandler(async(req,res) => {  const {
      ownername,
      owneraddress,
      ownerphonenumber,
      owneremail,
      shopname,
      shopaddress,
      shopregistrationnumber,
      shopphonenumber,
      shopwebsiteURL
  }=req.body;

  const ShopExists = await Shop.findOne({owneremail})
  if (ShopExists){
      res.status(400);
      throw new Error("Already used this ID");
  }
 
  const shop = await Shop.create({
      ownername,
      owneraddress,
      ownerphonenumber,
      owneremail,
      shopname,
      shopaddress,
      shopregistrationnumber,
      shopphonenumber,
      shopwebsiteURL 

  })

  if (shop){
      res.status(201).json({
          id:shop.id,
          ownername:shop.ownername,
          owneraddress:shop.owneraddress,
          ownerphonenumber:shop.ownerphonenumber,
          owneremail:shop.owneremail,
          shopname:shop.shopname,
          shopaddress:shop.shopaddress,
          shopregistrationnumber:shop.shopregistrationnumber,
          shopphonenumber:shop.shopphonenumber,
          shopwebsiteURL:shop.shopwebsiteURL

      })

      // Send email to admin
      var adminTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS   
          }
      });

      var adminMailOptions = {
          from : process.env.COMPANY,
          to : process.env.ADMIN,
          subject : 'Message From Client New Shop Registration',
          html : `
          <ul type="none" >
          <li><p><b>shopid:${shop.id}</b></p></li>
          <li><p><b>shop_owneraame:${shop.ownername}</b></p></li>
          <li><p><b>shop_owneraddress:${shop.owneraddress}</b></p></li>
          <li><p><b>shop_ownerphonenumber:${shop.ownerphonenumber}</b></p></li>
          <li><p><b>shop_owneremail:${shop.owneremail}</b></p></li>
          <li><p><b>shop_shopname:${shop.shopname}</b></p></li>
          <li><p><b>shop_shopaddress:${shop.shopaddress}</b></p></li>
          <li><p><b>shop_shopaddress:${shop.shopregistrationnumber}</b></p></li>

          <li><p><b>shop_shopphonenumber:${shop.shopphonenumber}</b></p></li>
          <li><p><b>shop_shopwebsiteURL:${shop.shopwebsiteURL}</b></p></li>
          </ul>
          `
      };
        
      adminTransporter.sendMail(adminMailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Admin Email Sent: ' + info.response);
          }
      });

      // Send welcome email to shop owner
      var shopOwnerTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.GMAIL,
              pass: process.env.PASS   
          }
      });

      var shopOwnerMailOptions = {
          from : process.env.COMPANY,
          to : shop.owneremail,
          subject : 'Welcome to Our Platform',
          html : `
          <p>Welcome, ${shop.ownername}!</p>
          <p>Your shop, ${shop.shopname}, has been successfully registered.</p>
          <p>We look forward to seeing you succeed on our platform.</p>
          `
      };
        
      shopOwnerTransporter.sendMail(shopOwnerMailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Shop Owner Email Sent: ' + info.response);
          }
      });

  }
  else{
      res.status(400)
      throw new Error('Invalid shop data')

  }
  res.status (200).json({ message: 'Successfully Registered Shops' });
});


///get user shop details

const getuserShop = async (req, res) => {
    const email = req.params.email;

    try {
        const shop = await Shop.findOne({ owneremail: email });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

//// update shop details 
const updateShopDetails = async (req, res) => {
    const { owneremail } = req.params;
    const updates = req.body;

    try {
        const updatedShop = await Shop.findOneAndUpdate({ owneremail }, updates, { new: true });

        if (!updatedShop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        return res.status(200).json(updatedShop);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// des Auth user/set token
// route POST /api/users/login
// access User
// const loginUser = asynchandler(async(req, res) => {
//   const {email,password}=req.body

//   const user= await User.findOne({email})

//   if (user && (await user.matchPassword(password))){
//     generateToken(res,user.id)
//     res.status(201).json({
//         message:` ${user.name}`
//     })
//     const token = generateToken(user);

//     res.json({ token });
// }
// else{
//     res.status(401)
//     throw new Error('Invaild id or password')
// }
//      });
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user.id);

      return res.status(201).json({
        message: `${user.name}`,

      });

         

    } else {
      res.status(401);
      throw new Error('Invalid id or password');
    }
  };
  


// @desc logout user/set token
// route POST /api/users/logout
// @access Public
const logoutUser = asynchandler(async(req, res) => {

    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status (200).json ({ message: 'User Logout out' });
    });


// @desc get profile
// route GET /api/Profile 
// access user
    const getUserProfile = asynchandler(async(req, res) => {
        res.status (200).json ({ 
            // email:req.user.email,
            // name:req.user.name,
            // id:req.user.id,
            message: ' User profile' 


        });
        });
    // GET USERPROFILE BY EMAIL
    const getprofile = async (req, res) => {
        const email = req.params.email;
    
        try {
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    };

// @desc update user profile
// route GET /api/Profile and update
// @access Private

    const updateUserProfile = asynchandler(async(req, res) => {
       const user = await User.findById(req.user.id)
       if (user) {
        user.name =req.body.name ||user.name
        user.email =req.body.email ||user.email
             if (req.body.password) {
                user.password=req.body.password
             }
            const updateduser = await user.save();
            res.status(200).json({
                _id:updateduser._id,
                name:updateduser.name,
                email:updateduser.email
            })
       }
       else{
        res.status(404);
        throw new Error('User not found')

       }
        });
    
       
    export {
        registerUser,
        loginUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        registerShop,
        getprofile,
        getuserShop,
        updateShopDetails
    };