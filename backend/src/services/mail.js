const nodemailer = require('nodemailer');
const axios = require('axios');
const User = require('../models/User.js');
const githubServiceUser = require('../services/getuser.js');

const findUserId = async () => {
    try{
        const users = await User.find({});
        const userId = users.map(ele => ele.githubId);

        return userId;
    }catch(err){
        console.log(err);
    }
}

const checkEventData = async (userId) => {

    const user = await User.findOne({userId}).exec();
    const repos = user.repos;
    let num = -1;

    const eventData = (await Promise.all(
        repos.map(repo => {
            num++;
            const link = `https://api.github.com/repos/${repo}/events`
            return eventsCheck(link, user, num)
        })
    )).filter(ele => ele).flat();
    
    if (user.events !== eventData){
        await User.updateOne({userId},{events:eventData}).exec();
        console.log("success userDB updata");
    }
    
}

const eventsCheck = async (link, user, num) =>{
    try{
        const JsonData = await axios.get(link,{
            headers: {
                Authorization: `token ${user.accessToken}`
            },
        });

        if (user.events[num] !== JsonData.data[0].id){

            let data = {
                type: JsonData.data[0].type,
                name: JsonData.data[0].actor.login,
                repo: JsonData.data[0].repo.name,
            }

            if(data.type === 'PushEvent' && user.checkCommit){
                data.type = 'Commit'
                sendMail(user,data);
            }
            else if(data.type === 'IssuesEvent' && user.checkIssue){
                data.type = 'Issue'
                sendMail(user,data);
            }
            else if(data.type === 'IssueCommentEvent' && user.checkIssue){
                data.type = 'IssueComment'
                sendMail(user,data);
            }
            else if(data.type === 'PullRequestEvent' && user.checkPr){
                data.type = 'PullRequest'
                sendMail(user,data);
            }
        }

        return JsonData.data[0].id

    }catch(err){
        return '0'
    }
}

const sendMail = async (user,data) =>{

    try{
        if (user.email === null) throw new Error("사용자의 이메일이 없습니다.");

        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth:{
                user: process.env.Gmail,
                pass: process.env.GmailPW
            }
        });
        
        let mailOptions = {
            from: process.env.Gmail,
            to: user.email,
            subject: data.repo + '에서 Event가 발생하였습니다. <Syncell-Bell>',
            html: `
                <h1> ${data.repo}에서 Event가 발생하였습니다. </h1>
                <p> ${data.repo}에서 ${data.name}님이 ${data.type}를(을) 하셨습니다. </p>
            `
        }
        
        transporter.sendMail(mailOptions, async(err, info) => {
            if (err) throw new Error('메일 보내기 실패');
        });
    }catch(err){
        console.log(err);
    }
    
}

module.exports = {findUserId, checkEventData}
