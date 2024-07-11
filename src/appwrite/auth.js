import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //signup
    async createAccount({email, password, name}) {
        try{

            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                //call another method
                //if account exist login
                return this.login(email, password);
            }else{
                return userAccount;
            }

        }catch (error){
            throw error;
        }
    }

    //signin
    async login(email, password){
        try {
            console.log(email, password);
            const loginStatus = await this.account.createEmailPasswordSession(email, password);
            console.log(loginStatus);
            if(loginStatus){
                return loginStatus
            }
            // loginStatus.then((res) => {
            //     return res;
            // });
        
        } catch (error){
            throw error;
        }
    }
    
    //signin check
    async getCurrentUser(){
        /*
        try {
            const currentUser =  await this.account.get();

            if(currentUser){
                return currentUser
            }else{
                return null
            }

        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
        */  
        try {
            const currentUser =  await this.account.get()
            
            // const currentUser = 'user1'
            if(currentUser){
                return currentUser
            }else{
                console.log("no current user");
                return null;
            }
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        //if it stucks then it will return null
        return null;
    }

    //logout
    async logout(){
            try {
                await this.account.deleteSessions();
            } catch (error){
                console.log("Appwrite service :: logout :: error", error);
            }
    }
}



const authService = new AuthService();


/*
NOTE :
    we are exporting obj directly, as whenever we use this service we have to create the obj for this class to use this service... 
    to avoid this scenario we are directly exporting obj here
*/
export default authService;

