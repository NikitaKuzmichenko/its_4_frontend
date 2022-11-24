import urls from './utils/UrlProvider';

const JSON_CONTENT_TYPE_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function throwErrorOnErrorResponce(responce){
    if(responce.ok) {
        return responce;
    }else{
        throw new Error(responce.status);
    }
}

class UserService{

    getAllUsers(){
        return fetch(urls.USERS_URL, {
            method: "GET",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }
    
    blockUsersById(ids){
        return fetch(urls.BLOCK_USERS_URL, {
            method: 'POST',
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(Array.from(ids))
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }

    unblockUsersById(ids){
        return fetch(urls.UNBLOCK_USERS_URL, {
            method: "POST",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(Array.from(ids))
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }

    deleteUsersById(ids){
        return fetch(urls.DELETE_USERS_URL, {
            method: "DELETE",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(Array.from(ids))
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }

    createUser(user){
        return fetch(urls.REGISTER_URL, {
            method: "POST",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(user)
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }

    loginUser(credentials){
        return fetch(urls.LOGIN_URL, {
            method: "POST",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(credentials)
          }).
          then(responce=>throwErrorOnErrorResponce(responce)).
          then(responce => {return responce.text()})
    }

    logoutUser(id){
        return fetch(urls.LOGOUT_URL, {
            method: "POST",
            headers: JSON_CONTENT_TYPE_HEADER,
            credentials: 'include',
            body:JSON.stringify(Array.from(id))
          }).then(responce=>{return throwErrorOnErrorResponce(responce);});
    }
}

export default new UserService();