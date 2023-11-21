const userVal = require("../model/login-all-schema");
const teams = require("../model/team")
const userReview = require("../model/user-review")
exports.create = async(req,resp)=>{
    if(!req.body){

        resp.status(404).resp("registration",{mess:"content cannot be empty "})
    }

    try {
   
        const user = new userVal ({

            name:req.body.name,
            email:req.body.email,
            pass:req.body.pass,
            phon:req.body.phon



        })

       const data =  await user.save()
    //    resp.render("registration",{mess:" Registration Sucessful"})

   resp.render("index",{mess:" Registration Sucessful"})

    }
    catch {

        resp.render("registration",{mess:" Something went wrong on the server"})

    }
}

exports.login = async(req,resp)=>{

   if(!req.body){
    resp.status(404).render("index",{mess:"no response from user "})
   }

   try {

    const email = req.body.email;
    const password = req.body.pass ;

    const  userLogin = await userVal.findOne({email:email,pass:password})

    if(userLogin){

        if(userLogin.profile=="admin"){

            try {
                 
                const result = await userReview.aggregate([
                    {
                        $group: {
                            _id: "$productName",
                            likeCount: {
                                $sum: { $cond: [{ $eq: ["$review", "like"] }, 1, 0] }
                            },
                            dislikeCount: {
                                $sum: { $cond: [{ $eq: ["$review", "dislike"] }, 1, 0] }
                        }
                    }}
                ]).exec();
               
                
                resp.render('admin/admin_dashboard', { result });
    
            }
             catch (err) {
                console.error(err);
            }
        
    
       
    }
    else {

        //user 
        try {  
            
            const  team =await teams.find()
    
            if(userLogin.hasS==true){
        
                resp.render("thanks",{mess:" you already gave ur response "});
            }
        
      
            resp.render("team",{userLogin,team})
               
        }
        catch (error){

            resp.status(400).send("there is error in server ")
              }
        
     }
    }

    else {

        resp.render("index",{mess:" invalid password or email "})
    }
  
   
}
catch(err){

 console.log(err);
 resp.render(404).send({mess:"there is error in server "})
}
}

exports.teamCreate = async(req,resp)=>{


    if(!req.body){

        resp.status(400).render("admin/add_team",{mess:" u have not entered any values"})
    }
  
    try{

      const {name } = req.body; 

      const teamName = await teams.findOne({name});

      if(teamName){

        resp.render('admin/add_team',{mess:" you already have added this team "})
      }

      const  teamAdd = new teams({name})

         const savedTeam =  await teamAdd.save()
         resp.render("admin/add_team",{mess:" added "})
    }
 catch(err){

 console.log(err);
    resp.status(400).render('admin/add_team',{mess:"  u made an error "})



 }
}
exports.getallTeam = async(req,resp)=>{

    const allTeam = await teams.find()

    resp.render("team", {allTeam})
}

exports.submitReview = async (req,resp)=>{


    const userEmail = req.body.userEmail;
    const productName = req.body.productName;
    const review = req.body.review ;

     const UserReview = new userReview({
        userEmail,productName,review
     })

     try {

      await  UserReview.save();

      await userVal.updateOne({ email: userEmail }, { $set: { hasS: true } });

      resp.render('thanks', { mess: "Thank you, your review is submitted." });

     }
     catch (err){
 
        console.log(err)

        resp.render("thanks",{mess:"something went wrong on server"})

     }

}


