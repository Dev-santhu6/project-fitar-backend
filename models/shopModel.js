import mongoose from "mongoose";

// ownername 
// owneraddress
// ownerphonenumber
// owneremail
// shopname
// shopaddress
// shopphone number
// shopwebsite URL

const shopSchema = mongoose.Schema ({
    ownername: {
    type: String,
    required: true
    },

    owneraddress: {
    type: String,
    required: true
    
    },

    ownerphonenumber: {
    type: String,
    required: true
  },

    owneremail: {
    type: String,
    required: true,
    
    },

    shopname: {
    type: String,
    required: true
    },

    shopaddress: {
    type: String,
    required: true
    
    },
    shopregistrationnumber: {
      type: String,
      required: true
      
      },

    shopphonenumber: {
    type: String  },

   shopwebsiteURL: {
    type: String 
  }
  
}

,{
   timestamps:true

});

const Shop = mongoose.model('ARshop', shopSchema);

export default Shop;
