//const nodemailer = require('nodemailer');
const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');

const checkData = async (token,userId) => {
    const repos = await githubServiceUser.orgRepoName(token,userId);

    const eventData = (await Promise.all(
        repos.map(repo => {
            const link = `https://api.github.com/repos/${repo}/events`
            return repoCheckData(link,repo,token,userId)
        })
    )).filter(ele => ele).flat();

}

const repoCheckData = async (link,token,userId) =>{
    const JsonData = await axios.get(link,{
        headers: {
            Authorization: `token ${token}`
        },
    });
    const event = []

    //JsonData.data[0].id

    console.log(JsonData.data[0].id)
    return 's'
}

const sendMail = async (req,res,user,data) =>{

    try{
        if (user.email === null) throw new Error("사용자의 이메일이 없습니다.");

    }catch(err){

    }

    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: process.env.Gmail,
            pass: process.env.GmailPW
        }
    });
    
    let mailOptions = {
        from: process.env.G_Email,
        to: user.email,
        subject: 'Test Email<choi hyung soon>',
        html: `
            <h1> Test Email </h1>
            <p> hi hyung soon </p>
        `
    }

    try{
        transporter.sendMail(mailOptions, async(err, info) => {
            if (err) throw new Error('메일 보내기 실패');
            await res.status(200).json({
                code: '200',
                status: '성공 : 메세지 발송',
                message : '메세지 보내기 성공',
                info: info
            });
        });
    }catch(err){
        console.log(err);
        await res.status(500).json({
            code: '500',
            status: '에러: 서버 에러',
            message:  `${err}`
        });
    }
}

module.exports = {sendMail, repoCheckData}
