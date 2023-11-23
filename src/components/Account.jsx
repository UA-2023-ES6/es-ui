import { createContext } from "react"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import Pool from "../UserPool"

const AccountContext = createContext()

const Account = ({children}) => {

    const getSession = async () => {
        return await new Promise((resolve,reject) => {
            const user = Pool.getCurrentUser()
            if(user) {
                user.getSession((err,session) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(session)
                    }
                })
            }
            else {
                reject("no user")
            }
        })
    }

    const authenticate = async (Username,Password) => {
        return await new Promise((resolve,reject) => {
            const user = new CognitoUser({Username,Pool})

            const authDetails = new AuthenticationDetails({Username,Password})

            user.authenticateUser(authDetails,{
                onSuccess: (data) => {
                    console.log("sucess:",data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("failure:",err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("password required:",data)
                    resolve(data)
                }
            })
        })
        
    }

    const logout = () => {
        const user = Pool.getCurrentUser()

        if(user) {
            user.signOut()
        }
    }

    return(
        <AccountContext.Provider value={{authenticate, getSession, logout}}>
            {children}
        </AccountContext.Provider>
    )
}

export {Account,AccountContext }