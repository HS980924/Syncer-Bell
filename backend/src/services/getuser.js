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
        'repo' : userdata.repos_url
    }
    return leftSide
}
/////////////////////////////////////////////////개인 프로필 데이터 가져오기////////////////////////////////////////////

////////////////////////////////////////////////commit 내용 및 개수 파악////////////////////////////////////////////////
// 유저 레포 이름 가져오기
const getFullName = async (token) => {
    try{
        const orgs = []
        var per_page = 100
        var page = 1
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

const AllData = function (com, iss, pull) {
    const allData = {
        "commit" : getRefineData(com),
        "issue" : getRefineData(iss),
        "pulls" : getRefineData(pull),
        "cnt" : cntInfo(com,iss,pull)
    }
    return allData
}

const getRefineData = function (data) {
    if (data.length > 10){
        const result = data.slice(0,10);
        return JSON.stringify(result)
    }

    return data
}

const cntInfo = function (commitData, issueData, pullData) {
    const staticData = {
        "commit" : commitData.length,
        "issue" : issueData.length,
        "pulls" : pullData.length
    }
    return staticData
}



// 유저가 속한 조직에서 참여한 레포 확인하는 함수
// const orgRepoCheck = async (fullname) => {
//     try{
//         const link = `https://api.github.com/repos/${fullname}/contributors`
//         const Data = await axios.get(link);
//         const contributors = Data.data.map(ele => ele.login);
//         contributors.push(fullname);
//         return contributors
//     } catch(err){
//         return null
//     }
// }

module.exports = {
    UserInfo,
    getFullName,
    getRefineData,
    AllData
}