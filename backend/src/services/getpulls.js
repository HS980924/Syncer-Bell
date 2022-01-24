const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');

// 유저 레포의 pullrequest 타이틀 및 정보 가져오기
const getPullList= async (url,repo,token,userId) => {
    try{
        const JsonData = await axios.get(url,{
            headers: {
                Authorization: `token ${token}`
            }
        });
        const pullList = (await Promise.all( 
            JsonData.data.map((pull) =>{
                if (pull.user.login === userId){
                    var pullData = new Object();
                    pullData.repoName = repo;
                    pullData.title = pull.title;
                    pullData.user = pull.user.login;
                    pullData.body = pull.body;
                    pullData.label = pull.labels.name;
                    pullData.color = pull.labels.color;
                    pullData.assig = pull.assignees.login;
                    pullData.date = pull.updated_at;
                    pullData.url = pull.html_url;
                    return pullData
                }
            })
        )).filter(ele => ele);
        return pullList.flat()
    }catch(err){
        return err
    }
}

// 유저 이슈 정보 가져오기
const getUserPull = async (userId,token) => {
    try{
        const repos = await githubServiceUser.getFullName(token);

        // const issueInfo = (await Promise.all(
        //     repos.map(repo => {
        //         return orgRepoCheck(repo);
        //     })
        // )).filter(ele => ele);

        
        const pulldata = (await Promise.all(
            repos.map(repo => {
                if (repo.includes(userId)){
                    const link = `https://api.github.com/repos/${repo}/pulls`
                    return getPullList(link,repo,token,userId)
                }
            })
        )).filter(ele => ele).flat();

        pulldata.sort((a,b) => {
            const day1 = new Date(a.date);
            const day2 = new Date(b.date);
            return day2 - day1;
        });

        return pulldata
    } catch(err){
        return err
    }
}

module.exports = {
    getUserPull,
}