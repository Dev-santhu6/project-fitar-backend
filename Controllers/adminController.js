import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import asynchandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import Shop from '../models/shopModel.js'
import stripePackage from 'stripe';


dotenv.config();

// des Auth user/set token
// route POST /api/users/admin-login
// access admin
// const loginAdmin = asynchandler(async (req, res) => {
//     const {email,password}=req.body
//     const user = await User.findOne({email});
//     if (user.role !== "admin") throw new Error("Not Authorised");
//     if (user && (await user.matchPassword(password))){
//   generateToken(res,user.id)
//   res.status(201).json({
//      message:"Hello Admin : Welcome to Admin page"
//   })
// }
// else{
//   res.status(401)
//   throw new Error('Invaild id or password')
// }
//    });




const loginAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    if (email === process.env.ADMIN) {
      return res.status(200).json({ message: 'Welcome admin!' });
    } else {
      return res.status(200).json({ message: 'Welcome user!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc logout user/set token
// route POST /api/admin-logout
// @access User
const logoutAdmin = asynchandler(async (req, res) => {

  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Admin Logout out' });
});


// @desc get allgetShopDetails
// route GET /api/shopprofile
// access admin
const getShopDetails = asynchandler(async (req, res) => {
  const shop = await Shop.find({});
  res.json(shop);
})


// @desc get all usersprofile
// route GET /api/usersprofile
// access admin
const getAllUsers = asynchandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
})


//delete shop by admin in shoponwer email
const deleteShop = asynchandler(async (req, res) => {
  const { owneremail } = req.body;
  const shop = await Shop.findOne({ owneremail })
  try {
    const deleteShop = await Shop.findByIdAndDelete(shop._id);
    return res.json({ message: `Shop Deleted Successfully:${shop.id}` }); //${shop.id}
  } catch (error) {
    throw new Error(error);
  }
});


//  // delete users by admin in email
const deleteUser = asynchandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email })
  try {
    const deleteUser = await User.findByIdAndDelete(user._id);
    return res.json({ message: `User Deleted Successfully:${user.id}` });
  } catch (error) {
    throw new Error(error);
  }
});

// const updateShop = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const options = { new: true }; // Return the modified document

//     const updatedShop = await Shop.findByIdAndUpdate(id, updates, options);

//     if (!updatedShop) {
//       return res.status(404).json({ message: 'Shop not found' });
//     }

//     res.status(200).json({ message: 'Shop updated successfully', shop: updatedShop });
//   } catch (error) {
//     console.error('Failed to update shop', error);
//     res.status(500).json({ message: 'Failed to update shop' });
//   }
// };

// const updateShop = async (req, res) => {
//   try {
//     const { email } = req.params;
//     delete updates._id; // Remove the _id field from updates

//     const updates = req.body;
//     const options = { new: true }; // Return the modified document

//     const updatedShop = await Shop.findOneAndUpdate({ email }, updates, options);

//     if (!updatedShop) {
//       return res.status(404).json({ message: 'Shop not found' });
//     }

//     res.status(200).json({ message: 'Shop updated successfully', shop: updatedShop });
//   } catch (error) {
//     console.error('Failed to update shop', error);
//     res.status(500).json({ message: 'Failed to update shop' });
//   }
// };


const updateShop = async (req, res) => {
  try {
    const { email } = req.params;
    const updates = req.body;
    delete updates._id; // Remove the _id field from updates
    const options = { new: true }; // Return the modified document

    const updatedShop = await Shop.findOneAndUpdate({ email }, updates, options);

    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({ message: 'Shop updated successfully', shop: updatedShop });
  } catch (error) {
    console.error('Failed to update shop', error);
    res.status(500).json({ message: 'Failed to update shop' });
  }
};



// var shopOwnerTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL,
//     pass: process.env.PASS
//   }
// });

// const sendEmail = async (req, res) => {
//   const { shopId } = req.params;

//   try {
//     const shop = await Shop.findById(shopId);
//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }

//     const mailOptions = {
//       from: process.env.COMPANY,
//       to: shop.owneremail,
//       subject: 'Regarding Your Shop',
//       htmi: `<p>We will contact you regarding your shop.</p>
//       <p>please pay your bill...</p>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Failed to send email');
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).send('Email sent successfully');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching shop:', error);
//     res.status(500).send('Failed to fetch shop');
//   }
// };

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.GMAIL,
//     pass: process.env.PASS
//   }
// });

// const sendEmail = async (req, res) => {
//   const { owneremail } = req.body;
//   const localIpAddress = '192.168.104.125'; // Replace 'your_local_ip_address' with your actual IP address

//   const paymentLink = `http://${localIpAddress}:3000/Checkout`;
//   try {
//     const shop = await Shop.findOne({ owneremail });
//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }

//     const mailOptions = {
//       from: process.env.COMPANY,
//             to: shop.owneremail,
//             subject: 'Regarding Your Shop',
//             html: `<p>We will contact you regarding your shop.</p>
//             <p>please pay your bill...</p>
//             <p>Click <a href="${paymentLink}">here</a> to complete your payment.</p>`
//           };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Failed to send email');
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).send('Email sent successfully');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching shop:', error);
//     res.status(500).send('Failed to fetch shop');
//   }
// };




const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS
  }
});

const sendEmail = async (req, res) => {
  const { owneremail } = req.body;
  // const localIpAddress = '192.168.104.125'; // Replace 'your_local_ip_address' with your actual IP address

  try {
    const shop = await Shop.findOne({ owneremail });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);   
    // Create a Payment Intent with the desired amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: 'usd',
      metadata: {
        shopId: shop._id.toString(), // Add shop ID as metadata
      },
    });

    // const paymentLink = `http://${localIpAddress}:3000/checkout/${paymentIntent.client_secret}`;
    const paymentLink= "https://buy.stripe.com/test_00gcO13UFdopeWc9AA"
  
    const mailOptions = {
      from: process.env.COMPANY,
      to: shop.owneremail,
      subject: 'Regarding Your Shop',
      html: `<div id="invoice-POS" style="box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); padding: 2mm; margin: 0 auto; background: #FFF;">
      <center id="top">
        <div class="logo"></div>
        <div class="info"> 
          <h1>FITAR PAYMENT</h1>
        </div>
      </center>
    
      <div id="mid" style="min-height: 80px;">
        <div class="info">
          <h2>Contact Info</h2>
          <p> 
            Address: "${shop.owneraddress}" <br>
            Email: "${shop.owneremail}"<br>
          </p>
        </div>
      </div>
    
      <div id="bot">
        <div id="table">
          <table style="width: 100%; border-collapse: collapse; border-spacing: 0;">
            <tr class="tabletitle" style="background-color: #f2f2f2;">
              <td class="item" style="padding: 10px; text-align: left;"><h2></h2>${shop.shopname} Details</td>
              <td class="Rate" style="padding: 10px; text-align: right;"><h2>Total</h2></td>
            </tr>
    
            <tr class="service">
              <td class="tableitem" style="padding: 10px; text-align: left;"><p class="itemtext">System Integration</p></td>
              <td class="tableitem" style="padding: 10px; text-align: right;"><p class="itemtext">LKR:40,000.00</p></td>
            </tr>
    
            <tr class="tabletitle" style="background-color: #f2f2f2;">
              <td class="Rate" style="padding: 10px; text-align: left;"><h2>Total</h2></td>
              <td class="payment" style="padding: 10px; text-align: right;"><h2>LKR:40,000.00</h2></td>
            </tr>
          </table>
        </div><!--End Table-->
    
        <div id="legalcopy" style="margin-top: 5mm;">
          <p class="legal"><strong>Thank you for your business!</strong> Payment is expected within 31 days; please process this invoice within that time. </p>
        </div>
      </div>
      <p>We will contact you regarding your shop.</p>
      <p>Please pay your bill...</p>
      <p>Click <a href="${paymentLink}">here</a> to complete your payment.</p>
    </div>
    
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).send('Failed to fetch shop');
  }
};



export {

  loginAdmin,
  logoutAdmin,
  getShopDetails,
  getAllUsers,
  deleteShop,
  deleteUser,
  updateShop,
  sendEmail

};