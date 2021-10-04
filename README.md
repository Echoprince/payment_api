# Simple User Payment App

simple user Payment App

# Wallet Functionalities

- Create/Register New Users
- Sign In Users
- Authenticate signed in Users
- Credit and Debit User Wallet
- Check User Wallet Balance

**Author :** Uchenna Prince Chieke

**Environments**

Node version - v14.15.0

**This application uses the following technologies:**

- nodeJs
- expressJs
- mongoDB

Note:  `run all commands in the IDE Terminal`

**Install all dependencies**

```
npm Install --save
```
**Install all Devdependencies**

```
npm Install --save-dev
```

**Start the application**s

```
npm start
```

## To test the application

```
Postman
```

## Register A New User

**Endpoint** `http://localhost:3000/auth/register` - method (PUT)


```json

```
## Sign In A User

**Endpoint** `http://localhost:3000/auth/signin` - method (POST)

- Sign in a new user

```json
{
    
            "craeateWallet": {
                "href": "http://localhost:3000/wallet/create",
                "method": "POST"
            },
            "getWalletBalance": {
                "href": "http://localhost:3000/wallet/balance",
                "method": "GET"
            },
            "initiateTransaction": {
                "href": "http://localhost:3000/wallet/initiateTransaction",
                "method": "POST"
            }
        }
    }
}
```
