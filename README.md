Dependencies:
  node, yarn

Installation:
  yarn install

Start server:
  yarn start

Modules:
  User Module: {
    createUser: {
      method: POST,
      API: 'http://localhost:3000/api/users/createUser',
      body: {
        FName, LName, CompanyId, RoleId, Email, SignUpTime, Password
      }
    },
    verifyUser: {
      method: POST,
      API: 'http://localhost:3000/api/users/verifyUser',
      body: {
        Email, Password
      }
    },
    userDetails: {
        method: GET,
        API: 'http://localhost:3000/api/users/userDetails/<userId>'
    }
  }
