import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: ${{ secrets.COGNITO_USER_POOL_ID }},
    ClientId: ${{ secrets.COGNITO_CLIENT_ID }}
}

const userPool = new CognitoUserPool(poolData);

export default userPool
