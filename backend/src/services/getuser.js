const axios = require('axios');

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
        "repo" : userdata.repos_url,
        "org" : userdata.organizations_url
    }
    return leftSide
}
/////////////////////////////////////////////////개인 프로필 데이터 가져오기////////////////////////////////////////////

////////////////////////////////////////////////commit 내용 및 개수 파악////////////////////////////////////////////////
const getFullName = async (token) => {
    try{
        const res = await axios.get(`https://api.github.com/user/repos`,{
            headers: {
                Authorization: `token ${token}`
            }
        });
        const orgs = res.data.map(ele => ele.full_name);
        return orgs
    } catch(err){
        return err
    }
}

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
            if(com.commit.author.name === userId){
                var commitData = new Object();
                commitData.repoName = repo;
                commitData.user = com.commit.author.name;
                commitData.message = com.commit.message;
                commitData.date = com.commit.author.date;
                commitData.url = com.html_url;
                commitList.push(commitData);
            }
        })
        return commitList
    }catch(err){
        return err
    }
}

// 유저가 속한 조직에서 참여한 레포 확인하는 함수
const orgRepoCheck = async (fullname) => {
    try{
        const link = `https://api.github.com/repos/${fullname}/contributors`
        const Data = await axios.get(link);
        const contributors = Data.data.map(ele => ele.login);
        contributors.push(fullname);
        return contributors
    } catch(err){
        return null
    }
}

const getUserCommit = async (userId,token) => {
    try{
        const repos = await getFullName(token)
        // const commitInfo = (await Promise.all(
        //     repos.map(repo => {
        //         return orgRepoCheck(repo)
        //     })
        // )).filter(ele => ele);

        const commitdata = (await Promise.all(
            repos.map(repo => {
                const link = `https://api.github.com/repos/${repo}/commits`
                return getCommitList(link,repo,token,userId)
            })
        )).filter(ele => ele);
        
        //console.log(commitdata.flat())
        const result = JSON.stringify(commitdata.flat())
        return result
    } catch(err){
        return err
    }
}

module.exports = {
    UserInfo,
    getUserCommit
}