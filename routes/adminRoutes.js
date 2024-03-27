import express from 'express';
const router = express. Router();

import { 
    loginAdmin,
    logoutAdmin,
    getShopDetails,
    getAllUsers,
    deleteShop,
    deleteUser,
    updateShop,
    sendEmail
} from '../Controllers/adminController.js';

import { protect,isAdmin } from '../middleware/authMiddleware.js';



// ("/api/admin",adminRoutes) this main routes

// admin routes
router.post("/admin-login",loginAdmin);
router.post('/adminlogout', logoutAdmin); 
// router.get("/shopsprofile",protect,isAdmin,getShopDetails); 
router.get("/shopsprofile",getShopDetails); 

// router.get("/usersprofile",protect,isAdmin,getAllUsers);
router.get("/usersprofile",getAllUsers);


// router.delete("/deleteshop",protect,isAdmin,deleteShop);
// router.delete("/deleteuser",protect,isAdmin,deleteUser);

router.delete("/deleteshop",deleteShop);
router.delete("/deleteuser",deleteUser);

router.put("/updateShop",updateShop); 
router.post("/sendemail",sendEmail); 




// start upload image
import {uploadImage,getImages,deleteImage} from "../Controllers/imageController.js"
import multer from 'multer';

const storage= multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadImage);
router.get('/getimages', getImages);
router.delete('/deleteimage', deleteImage); ///:public_id









router.get('/admin', isAdmin, (req, res) => {
    if (req.isAdmin) {
      // User is an admin, show dashboard
      res.render('/admin');
    } else {
      // User is not an admin, show error message or redirect
      res.redirect('/');
    }
  });


export default router;