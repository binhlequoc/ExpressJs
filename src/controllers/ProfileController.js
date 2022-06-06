const { viewsPath } = require("../config/Path.js");
module.exports={
    getProfilePage:(req,res)=>{
        res.render(viewsPath+"profile",{user:req.user});
    },
    updateProfile:(req,res)=>{

    },
    updatePassword:(req,res)=>{

    }
}