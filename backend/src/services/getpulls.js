const axios = require('axios');
const githubServiceUser = require('../services/getuser.js');
const User = require('../models/User.js')

// 유저 레포의 pullrequest 타이틀 및 정보 가져오기(pulls에서 가져오기)
const getPullList = async (url,repo,token,userId) => {
    try{
        var len = 0;
        var page = 1;
        var pullList = []
        do{
            const JsonData = await axios.get(url,{
                headers: {
                    Authorization: `token ${token}`
                },
                params :{
                    state : 'all',
                    per_page: 100,
                    page
                }
            });
            len = Object.keys(JsonData.data).length;
            if(len == 0){
                return null;
            }
            else{
                const pulls = (await Promise.all( 
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
                        else{
                            return null;
                        }
                    })
                )).filter(ele => ele);
                pullList.push(pulls);
                page++;
            }
        }while(len >= 100);

        return pullList.flat()
    }catch(err){
        return null
    }
}

// 유저 이슈 정보 가져오기
const getUserPull = async (userId,token) => {
    try{
        const user = await User.findOne({userId}).exec();
        const repos = user.repos;
        
        const pulldata = (await Promise.all(
            repos.map(repo => {
                const link = `https://api.github.com/repos/${repo}/pulls`
                return getPullList(link,repo,token,userId)
            })
        )).filter(ele => ele).flat();

        pulldata.sort((a,b) => {
            const day1 = new Date(a.date);
            const day2 = new Date(b.date);
            return day2 - day1;
        });

        return pulldata
    } catch(err){
        console.log(err);
        return err
    }
}

module.exports = {
    getUserPull
}