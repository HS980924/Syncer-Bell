const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');

// commit 정보 가져오는 함수 
const getCommitList = async (url,repo,token,userId) => {
    try{
        var commitList = []
        const JsonData = await axios.get(url,{
            headers: {
                Authorization: `token ${token}`
            }
        });
        JsonData.data.forEach((com) =>{
            try{
                if (com.author.login === userId){
                    var commitData = new Object();
                    commitData.repoName = repo;
                    commitData.user = com.author.login;
                    commitData.message = com.commit.message;
                    commitData.date = com.commit.author.date;
                    commitData.url = com.html_url;
                    commitList.push(commitData);
                }
            } catch(err){
                return null
            }
        })
        return commitList
    }catch(err){
        return null
    }
}


const getUserCommit = async (userId,token) => {
    try{
        const repos = await githubServiceUser.getFullName(token)
        
        const commitdata = (await Promise.all(
            repos.map(repo => {
                const link = `https://api.github.com/repos/${repo}/commits`
                return getCommitList(link,repo,token,userId)
            })
        )).filter(ele => ele).flat();

        commitdata.sort((a,b) => {
            const day1 = new Date(a.date);
            const day2 = new Date(b.date);
            return day2 - day1;
        });

        return commitdata
    } catch(err){
        return err
    }
}

module.exports = {
    getUserCommit,
}