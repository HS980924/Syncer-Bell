const axios = require('axios');
const User = require('../models/User.js')

/////////////////////////////////////////////////개인 프로필 데이터 가져오기////////////////////////////////////////////
// 유저 개인 정보 가져오는 함수
const UserInfo = (userdata) => {
    const leftSide = {
        "login" : userdata.login,
        "name" : userdata.name,
        "image" : userdata.avatar_url,
        "url": userdata.html_url,
        "context": userdata.bio,
        "email" : userdata.email,
        "company" : userdata.company,
        "location" : userdata.location,
        "blog" : userdata.blog,
        "followers" : userdata.followers,
        "following" : userdata.following,
        'repo' : userdata.repos_url
    }

    return leftSide
}

// 유저 레포 이름 가져오기
const getFullName = async (token) => {
    try{
        const orgs = []
        var per_page = 100
        var page = 1
        var len = 0
        var since = new Date().getFullYear();
        since = since + '-01-01T00:00:00Z';
        var visibility = 'public';
        do{
            const res = await axios.get(`https://api.github.com/user/repos`,{
                headers: {
                    Authorization: `token ${token}`
                },
                params: {
                    visibility,
                    since,
                    per_page,
                    page,
                }
            });
            const repoName = res.data.map(ele => ele.full_name);
            orgs.push(repoName)
            len = repoName.length;
            page++;
        }while(len > 99);
        return orgs.flat()
    } catch(err){
        console.log(err);
        return err
    }
}

// 유저가 속한 조직에서 참여한 레포 확인하는 함수
const orgRepoCheck = async (link,repo,Token,userId) => {
    try{
        //var anon = true;
        const Data = await axios.get(link,{
            headers: {
                Authorization: `token ${Token}`
            }
        });
        var len = Object.keys(Data.data).length;
        if (len <= 0){
            return null;
        }
        else{
            const contributors = Data.data.map(ele => ele.login);
            if (contributors.includes(userId)){
                return repo
            }
            else{
                return null
            }
        }
    } catch(err){
        console.log(err);
        return null
    }
}

//유저가 속한 레포에서 영향을 준 레포만 선별하여 리턴하는 함수
const orgRepoName = async(token,userId) =>{
    const repos = await getFullName(token);

    const orgData = (await Promise.all(
        repos.map(repo => {
            const link = `https://api.github.com/repos/${repo}/contributors`
            return orgRepoCheck(link,repo,token,userId)
        })
    )).filter(ele => ele).flat();

    return orgData
}

const updateUserRepos = async(userId) => {
    const user = await User.findOne({userId}).exec();
    if (!user){
        return err
    }
    else{
        const newRepos = await orgRepoName(user.accessToken, user.githubId);
        if(user.repos !== newRepos){
            await User.updateOne({userId},{repos:newRepos}).exec();
        }
    }
}

const CheckUserEvent = async(userId) => {
    const user = await User.findOne({userId}).exec();
    if (!user){
        return null
    }
    else{
        const repos = user.repos;

        const Event = (await Promise.all(
            repos.map(repo => {
                const link = `https://api.github.com/repos/${repo}/events`
                return getRepoEvents(link,user.accessToken);
            })
        )).filter(ele => ele).flat();

        if(user.events !== Event){
            await User.updateOne({userId},{events:Event}).exec();
        }

        return Event
    }

}

const getRepoEvents = async (link,Token) => {
    try{
        var anon = true;
        const Data = await axios.get(link,{
            headers: {
                Authorization: `token ${Token}`
            },
            params:{
                anon
            }
        });
        var len = Object.keys(Data.data).length;
        if (len == 0){
            return '0'
        }
        else{
            const EventId = Data.data[0].id
            return EventId;
        }
    } catch(err){
        console.log(err);
        return null;
    }
}

const AllData = function (com, iss, pull) {
    const allData = {
        "threeWeek" : threeWeekCommitCnt(com),
        "commit" : getRefineData(com),
        "issue" : getRefineData(iss),
        "pulls" : getRefineData(pull),
        "cnt" : cntInfo(com,iss,pull),
    }
    return allData
}

const getRefineData = function (data) {
    if (data.length > 10){
        const result = data.slice(0,10);
        return result
    }
    return data
}

const cntInfo = function (commitData, issueData, pullData) {
    let today = new Date();
    let year = today.getFullYear();

    const staticData = {
        "commits" : commitData.length,
        "issues" : issueData.length,
        "pulls" : pullData.filter(ele => ele.date.includes(year)).length
    }
    return staticData
}

const threeWeekCommitCnt = function (commits) {

    const commitCnt = {};
    const threeWeekAgo =  new Date();
    threeWeekAgo.setDate(threeWeekAgo.getDate() - 21);
    
    new Array(21).fill(0).forEach((_, days) =>{
        const pre = new Date(threeWeekAgo);
        pre.setDate(pre.getDate() + days + 1);

        var day = pre.getFullYear() + "-" + ("00" + (pre.getMonth() + 1)).slice(-2) + "-" + ("00" + pre.getDate()).slice(-2)

        commitCnt[day] = 0;
    })

    commits.forEach(com => {
        const Data = new Date(com.date);
        const dayData = Data.getFullYear() + "-" + ("00" + (Data.getMonth() + 1)).slice(-2) + "-" + ("00" + Data.getDate()).slice(-2)

        if (commitCnt.hasOwnProperty(dayData)){
            commitCnt[dayData]++;
        }
    })

    const result = []

    for (const key in commitCnt){
        result.push({date: key, number: commitCnt[key]});
    }

    return result;
}

module.exports = {
    UserInfo,
    getRefineData,
    AllData,
    orgRepoName,
    threeWeekCommitCnt,
    CheckUserEvent,
    updateUserRepos,
}