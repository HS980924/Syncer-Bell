const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');
const User = require('../models/User.js')


// commit 정보 가져오는 함수
const getCommitList = async (url,repo,token,userId) => {
    try{
        var len;
        var page = 1
        var commitList = []
        var since = new Date().getFullYear();
        since = since + '-01-01T00:00:00';
        do{
            len = 0
            const JsonData = await axios.get(url,{
                headers: {
                    Authorization: `token ${token}`
                },
                params :{
                    since,
                    per_page: 100,
                    page
                }
            });
            const coms = (await Promise.all( 
                JsonData.data.map((com) =>{
                    try{
                        len++;
                        if (com.author.login === userId){
                            var commitData = new Object();
                            commitData.repoName = repo;
                            commitData.user = userId;
                            commitData.message = com.commit.message;
                            commitData.date = com.commit.author.date;
                            commitData.url = com.html_url;
                            return commitData;
                        }
                    } catch(err){
                        return null
                    }
                })
            )).filter(ele => ele);
            commitList.push(coms)
            page++;
        }while(len > 99);
        return commitList.flat()
    }catch(err){
        return null
    }
}

const getUserCommit = async (userId,token) => {
    try{
        const user = await User.findOne({userId}).exec();
        const repos = user.repos;
        //const repos = await githubServiceUser.orgRepoName(token,userId)
        
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