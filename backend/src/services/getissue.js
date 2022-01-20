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

// 유저 issue의 comment정보 목록 가져오기
const getIssueComment = async (url) => {
    try{
        var commentList = []
        const JsonData = await axios.get(url);
        JsonData.data.forEach((cmt) =>{
            var commentData = new Object();
            commentData.cmtuser = cmt.user.login;
            commentData.cmtbody= cmt.body;
            commentData.cmtdate = cmt.updated_at;
            commentList.push(commentData);
        })
        //console.log(commentList)
        return commentList.flat()

    }catch(err){
        return err
    }
}

// 유저 레포의 issue 타이틀 및 정보 가져오기
const getIssueList = async (url,repo,token,userId) => {
    try{
        const JsonData = await axios.get(url,{
            headers: {
                Authorization: `token ${token}`
            }
        });
        const issueList = (await Promise.all( 
            JsonData.data.map((iss) =>{
                if (iss.user.login === userId){
                    var issueData = new Object();
                    issueData.repoName = repo;
                    issueData.title = iss.title;
                    issueData.user = iss.user.login;
                    issueData.date = iss.updated_at;
                    issueData.url = iss.html_url;
                    issueData.body = iss.body;
                    return issueData
                }
                //issueData.comments = getIssueComment(iss.comments_url);
            })
        )).filter(ele => ele);

        return issueList.flat()
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
const getUserIssue = async (userId,token) => {
    try{
        const repos = await getFullName(token);

        // const issueInfo = (await Promise.all(
        //     repos.map(repo => {
        //         return orgRepoCheck(repo);
        //     })
        // )).filter(ele => ele);

        
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
      
        const result = JSON.stringify(issuedata)
        return result
    } catch(err){
        return err
    }
}

const getOrgIssue = async () => {

}


module.exports = {
    getUserIssue,
    getOrgIssue,
}