const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = {
    GenToken: ""
};

class Auth {
    constructor() {
        this.generateHash = this.generateHash.bind(this)
        this.comparePass = this.comparePass.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this); 
    }

    async generateHash(password) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashpass =  await bcrypt.hash(password , salt);
                return resolve(hashpass);

            } catch(e) {
                return reject(e)
            }
        })
    }

    
    async comparePass(Password, encPass) {
        return new Promise(async (resolve, reject) => {
            try {
                const cpass = await bcrypt.compare(Password, encPass);
                return resolve(cpass);
            } catch(e) {
                return reject(e)
            }
        })
    }

    async register(req, res) {
        try{
            const email = req.body.email;
            const pass = req.body.password;
            const password = await this.generateHash(pass);
                       
            //find matching user
            const userexist = await User.findOne({email : email});
                //if user already exist.. 
                if(userexist) {
                    //res.redirect('/login');
                    console.log("user exist!!");
                    res.json({"message" : "User already exist!! Cannot register again."});
                } else {
                    console.log("registering user");
                    //create new user and complete the registereation.
                    const newuser = new User({email, password});
            
                    const user = await newuser.save((err, data)=>{
                        if(err) {
                            return console.log(err);
                        }
                        //generating users jwt token
                        Token.GenToken = jwt.sign({user},"authenticationsecretkey");
                        res.json({token : Token.GenToken });
                        console.log("Token:",Token.GenToken);
                    });
                }
        } catch(error){
            console.log(error);
        }
    } 

    async login(req, res) {  
        try{
            //find matching user
            const email = req.body.email; 
            const emailexist = await User.findOne({email : email});
            const encPass = emailexist.password;
            const pass = req.body.password; 
            const cpassword = await this.comparePass(pass, encPass);

            if(emailexist){
                if(cpassword){
                    //generating users jwt token
                    Token.GenToken = jwt.sign({email},"authenticationsecretkey");
                    res.json({token : Token.GenToken });

                } else {
                    res.json({message: 1 });
                }
            } else {
                res.json({message: 0 });
            }
        } catch(error){
                //FORBIDDEN
                console.log(error);
                res.sendStatus(403);
        }
    }
}    

module.exports = new Auth();