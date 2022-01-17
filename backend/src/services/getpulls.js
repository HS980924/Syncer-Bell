const axios = require('axios');

// 유저 레포 이름 가져오기
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

// 유저 레포의 pullrequest 타이틀 및 정보 가져오기
const getPullList= async (url,repo,token) => {
    try{
        const JsonData = await axios.get(url,{
            headers: {
                Authorization: `token ${token}`
            }
        });
        const pullList = (await Promise.all( 
            JsonData.data.map((pull) =>{
                var pullData = new Object();
                pullData.repoName = repo;
                pullData.title = pull.title;
                pullData.user = pull.user.login;
                pullData.body = pull.body;
                pullData.label = pull.label.name;
                pullData.color = pull.label.color;
                pullData.assig = pull.assignees.login;
                pullData.date = pull.updated_at;
                pullData.url = pull.html_url;
                return pullData
            })
        )).filter(ele => ele);

        return pullList.flat()
    }catch(err){
        return err
    }
}

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

// 유저 이슈 정보 가져오기
const getUserPull = async (userId,token) => {
    try{
        const repos = await getFullName(token);

        const issueInfo = (await Promise.all(
            repos.map(repo => {
                return orgRepoCheck(repo);
            })
        )).filter(ele => ele);

        
        const issuedata = (await Promise.all(
            issueInfo.map(repo => {
                if (repo.includes(userId)){
                    var full = repo[repo.length - 1]
                    const link = `https://api.github.com/repos/${full}/pulls`
                    return getPullList(link,full,token)
                }
            })
        )).filter(ele => ele);

        
        const result = JSON.stringify(issuedata.flat())
        return result
    } catch(err){
        return err
    }
}

const cntUserPull = async (data,userId) => {
    
}

module.exports = {
    getUserPull,
    cntUserPull
}