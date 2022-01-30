const axios = require('axios');
const { parse } = require('dotenv');
const e = require('express');

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
        do{
            const res = await axios.get(`https://api.github.com/user/repos`,{
                headers: {
                    Authorization: `token ${token}`
                },
                params: {
                    per_page,
                    page
                }

            });
            const repoName = res.data.map(ele => ele.full_name);
            orgs.push(repoName)
            len = repoName.length;
            page++;
        }while(len > 99);
        return orgs.flat()
    } catch(err){
        return err
    }
}

// 유저가 속한 조직에서 참여한 레포 확인하는 함수
const orgRepoCheck = async (link,repo,Token,userId) => {
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
        const contributors = Data.data.map(ele => ele.login);
        if (contributors.includes(userId)){
            return repo
        }
        else{
            return null
        }
    } catch(err){
        return null
    }
}

//유저가 속한 레포에서 영향을 준 레포만 선별하여 리턴하는 함수
const orgRepoName = async(token,userId) =>{
    const repos = await getFullName(token)

    const orgData = (await Promise.all(
        repos.map(repo => {
            const link = `https://api.github.com/repos/${repo}/contributors`
            return orgRepoCheck(link,repo,token,userId)
        })
    )).filter(ele => ele).flat();

    return orgData

}

const AllData = function (com, iss, pull) {
    const allData = {
        "twoWeek" : twoWeekCommitCnt(com),
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

const twoWeekCommitCnt = function (commits) {

    const commitCnt = {};
    const twoWeekAgo =  new Date();
    twoWeekAgo.setDate(twoWeekAgo.getDate() - 14);
    
    new Array(14).fill(0).forEach((_, days) =>{
        const pre = new Date(twoWeekAgo);
        pre.setDate(pre.getDate() + days + 1);

        var day = pre.getFullYear() + '-' + pre.getMonth()+1 + '-' + pre.getDate();

        commitCnt[day] = 0;
    })

    commits.forEach(com => {
        const Data = new Date(com.date);
        const dayData = Data.getFullYear() + '-' + Data.getMonth()+1 + '-' + Data.getDate(); 
        
        if (commitCnt.hasOwnProperty(dayData)){
            commitCnt[dayData]++;
        }

    })  

    return commitCnt
}

module.exports = {
    UserInfo,
    getRefineData,
    AllData,
    orgRepoName,
    twoWeekCommitCnt
}