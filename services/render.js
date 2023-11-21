
exports.homeRoute = (req,resp)=>{
 resp.render('index')

}
exports.regis = (req,resp)=>{

    resp.render('registration')
}
exports.adminpage = (req,resp)=>{

    resp.render('admin/add_team')
}

