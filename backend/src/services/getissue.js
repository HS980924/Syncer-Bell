const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');

// 유저 issue의 comment정보 목록 가져오기
// const getIssueComment = async (url) => {
//     try{
//         var commentList = []
//         const JsonData = await axios.get(url);
//         JsonData.data.forEach((cmt) =>{
//             var commentData = new Object();
//             commentData.cmtuser = cmt.user.login;
//             commentData.cmtbody= cmt.body;
//             commentData.cmtdate = cmt.updated_at;
//             commentList.push(commentData);
//         })
//         //console.log(commentList)
//         return commentList.flat()

//     }catch(err){
//         return err
//     }
// }

// 유저 레포의 issue 타이틀 및 정보 가져오기
const getIssueList = async (url,repo,token,userId) => {
    try{
        var len;
        var page = 1;
        var issueList = []
        var since = new Date().getFullYear();
        since = since + '-01-01T00:00:00';
        do{
            len = 0
            const JsonData = await axios.get(url,{
                headers: {
                    Authorization: `token ${token}`
                },
                params :{
                    state : 'all',
                    since,
                    per_page: 100,
                    page
                }
            });
            const issues = (await Promise.all( 
                JsonData.data.map((iss) =>{
                    try{
                        var Iu_check = iss.node_id
                        if (iss.user.login === userId && Iu_check.includes('I_')){
                            var issueData = new Object();
                            issueData.repoName = repo;
                            issueData.title = iss.title;
                            issueData.user = iss.user.login;
                            issueData.date = iss.updated_at;
                            issueData.url = iss.html_url;
                            issueData.body = iss.body;
                            return issueData
                        }
                    } catch(err){
                        return null
                    }
                })
            )).filter(ele => ele);
            issueList.push(issues);
            page++;
        }while(len > 99);

        return issueList.flat()
    }catch(err){
        return null
    }
}

// 유저 이슈 정보 가져오기
const getUserIssue = async (userId,token) => {
    try{
        const repos = await githubServiceUser.orgRepoName(token,userId);

        const issuedata = (await Promise.all(
            repos.map(repo => {
                const link = `https://api.github.com/repos/${repo}/issues`
                return getIssueList(link,repo,token,userId)
            })
        )).filter(ele => ele).flat();

        issuedata.sort((a,b) => {
            const day1 = new Date(a.date);
            const day2 = new Date(b.date);
            return day2 - day1;
        });
        return issuedata
    } catch(err){
        return err
    }
}

module.exports = {
    getUserIssue,
}