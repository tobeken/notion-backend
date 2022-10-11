const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.register = async(req,res)=> {
    //passwordの受け取り
const password =req.body.password;

try{
    //passwordの暗号化
    req.body.password = CryptoJS.AES.encrypt(password,process.env.SECRET_KEY)
    //ユーザの新規作成
    const user = await User.create(req.body);
    //JWTの発行
    const token = JWT.sign({id:user._id},process.env.TOKEN_SECRET_KEY,{
        expiresIn:"24h",
    });
    return res.status(200).json({user,token})
}catch(err){
    return res.status(500).json(err)

}
};

//ユーザログイン用API
exports.login = async(req,res) => {
    const {username,password} = req.body;

    try {
        //dbからユーザが存在するか探してくる
        const user =await User.findOne({username:username})
        if(!user){
            return res.status(400).json({
                errors: [{
                    param:"username",
                    msg:"ユーザ名が無効です"
                }]
            })
        }
        //パスワードがあっているか照合する
        const descryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if(descryptedPassword != password) {
            return res.status(401).json({
                errors:[{
                    param:"password",
                    msg:"パスワードが無効です"
                }]
            })
        }
        //JWTを発行
        const token = JWT.sign({id:user._id},process.env.TOKEN_SECRET_KEY,{
            expiresIn:"24h",
        });

        return res.status(201).json({user, token})
    }catch(err){
        return res.status(500).json(err)
    }

};