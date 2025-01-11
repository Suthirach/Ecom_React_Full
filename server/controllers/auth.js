const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async(req,res)=>{
    //code

    try{
        //code
        const { email, password } = req.body
        if(!email){
            /// step 1 Validate Body 
            return res.status(400).json({ message: 'Email is required!!!'})
        }

        if(!password){
            return res.status(400).json({ message: 'Password is requied!!'})
        }

        // step 2 Check mail in DB ว่าพร้อมไหมละ  
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already exits"})
        }
        // step 3 hashPassword ทำpasswordให้เป็น ผสมเพื่อความปลอดภัย 
        const hashPassword = await bcrypt.hash(password,10)
        
        // step 4 Register 
        await prisma.user.create({
            data:{
                email : email,
                password : hashPassword

            }
        })

        res.send('Register Success')

    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Sever Error"})
    }

}
exports.login = async(req,res)=>{
    //code
    
    try{
        //code
        const { email, password} = req.body
        // console.log(email,password)

        //step 1 check mail 
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ massage: "Email not Found or not Enabled"})
        }

        //step 2 check password 
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({ massage: "Password Invalid!!"})
        }

        //step 3 Create Payload 
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // console.log(payload)

        //step 4 Generate Token 
        jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'},(err,token)=>{
          if(err){
            return res.status(500).json({message: "Server Error"})
          }
          res.json({ payload, token})
        })


        
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Sever Error"})
    }




}
exports.currentUser = async(req,res)=>{
    //code

    try{
        //code
        const user = await prisma.user.findFirst({
            where : { email: req.user.email },
            select:{ 
                id:true,
                email: true,
                name:true,
                role:true
            }
        }) 
        res.json({ user })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Sever Error"})
    }



}
exports.currentAdmin = async(req,res)=>{
    //code

    try{
        //code
        res.send('Hi currentAdmin in controller')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Sever Error"})
    }




}
