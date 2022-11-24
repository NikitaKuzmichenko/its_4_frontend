import UserService from "./UserService"
const USER_ID_PROPERTY_NAME = "userId"

function storUserIdInLocalStorage(id){
    localStorage.setItem(USER_ID_PROPERTY_NAME,id);
}

function removeUserIdInLocalStorage(){
    localStorage.removeItem(USER_ID_PROPERTY_NAME);
}

class AuthenticationService{

    getCurrentUserId(){
        return localStorage.getItem(USER_ID_PROPERTY_NAME);
    }

    async logInUser(credentials){
        try{
            const user = JSON.parse(await UserService.loginUser(credentials));
            storUserIdInLocalStorage(user.id);
        }catch(ex){
            throw new Error(ex);
        }
    }

    async logOutUser(id){
        try{
            await UserService.logoutUser(id);
            removeUserIdInLocalStorage();
        }catch(ex){
            throw new Error(ex);
        }
    }

    async logOutCurrentUser(){
        const currentUserId = this.getCurrentUserId();
        console.log(currentUserId);
        if(currentUserId !== undefined){
            try{
                await UserService.logoutUser(currentUserId);
                removeUserIdInLocalStorage();
            }catch(ex){
                throw new Error(ex);
            }
        }
    }
}

export default new AuthenticationService();