const bcrypt = require('bcrypt'); // to hash the provided string

/*
    function to get user userDetails
    @params: id
*/

export function userDetails(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).send({Message: "User Id is required"});
  }
  const dbConnection = req.mysqlConnection; // dbConnection is assigned to req in server.js
  const query = `SELECT * FROM EndUser WHERE UsrId = "${userId}";`;
  return dbConnection.query(query, (err, resultObjs) => {
    if(err) {
      return res.status(500).send({Message: "Something went wrong"});
    }
    const data = [];
    if (!resultObjs.length) {
      return res.status(404).send({Message: "User not found"});
    }
    resultObjs.forEach(resultObj => {
      data.push({
        UserId: result[i].UsrId,
        FName: result[i].FName,
        LName: result[i].LName,
        CompanyId: result[i].OrganizationId,
        RoleId: result[i].RoleId,
        Email: result[i].Email,
        SignUpTime: result[i].SignUpTime
      });
    })
    return res.send(data);
  });
}

/*
    function to generate hashedString
    @params: password (String)
*/

function getPasswordHash(password) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10; // Length of the Salt to be added to the passpword before hashing.
    return bcrypt.genSalt(saltRounds, (err, salt) => {
      // Generate hash of the password with added salt.
      bcrypt.hash(userJsonObj.password, salt, (err1, hash) => {
        if(err1) return reject(err1);
        return resolve(hash)
      });
    });
  });
}

/*
    function to create user
    @params: FName, LName, CompanyId, RoleId, Email, SignUpTime, Password
*/

export function createUser(req, res) {
  const { FName, LName, CompanyId, RoleId, Email, SignUpTime, Password } = req.body;
  if (!FName || !LName || !OrganizationId || !RoleId || !Email || !SignUpTime || !Password) {
    return res.status(400).send({Message: "Insufficient Data"});
  }
  const dbConnection = req.mysqlConnection; // dbConnection is assigned to req in server.js
  const userExistsQuery = `SELECT UsrId FROM EndUser WHERE Email LIKE = "${Email}";`;
  return dbConnection.query(userExistsQuery, async (err, resultObjs) => {
    if (err) {
      return res.status(500).send({Message: "Something went wrong"});
    }
    if (resultObjs.length) {
      return res.status(409).send({Message: "User already exists"});
    }
    const endUserInsertionQuery = `INSERT INTO dbBh.EndUser
      (FName,LName,OrganizationId,RoleId,Email,SignUpTime)
      values
      ('${FName}', '${LName}', '${CompanyId}', '${RoleId}', '${Email}', '${SignUpTime}');`;
    const hashedPassword = await getPasswordHash(Password); // hashing the provided password
    return dbConnection.query(endUserInsertionQuery, (err, insertedObj) => {
      if (err) {
        return res.status(500).send({Message: "Something went wrong"});
      }
      const logInInsertionQuery = `INSERT INTO dbBh.Log_In
      (Email,Password,UsrId)
      values
      ('${Email},'${hashedPassword}', ${insertedObj.userid});`;
      return dbConnection.query(logInInsertionQuery, function(err, loginInsetedObj) {
        if (err) {
          return res.status(500).send({Message: "Something went wrong"});
        }
        return res.send({Message: "User created successfully"});
      });
    })
  });
}

/*
    function to verify user
    @params:  Email, Password
*/

export function verifyUser(req, res) {
  const { Email, Password } = req.body;
  if (!Email || !Password){
    return res.status(400).send({Message: "Insufficient Data"});
  }
  const dbConnection = req.mysqlConnection; // dbConnection is assigned to req in server.js
  const userCredentialsQuery = `SELECT * FROM Log_In WHERE Email LIKE = "${Email}";`;
  return dbConnection.query(userCredentialsQuery, async (err, resultObjs) => {
    if (err) {
      return res.status(500).send({Message: "Something went wrong"});
    }
    if (!resultObjs.length) {
      return res.status(404).send({Message: "User does'nt exists"});
    }
    const passwordMatch = bcrypt.compareSync(Password, resultObjs[0].Password);
    if (!passwordMatch) {
      return res.status(401).send({Message: "Invalid Credentials"});
    }
    return res.send({Message: "User verified"});
  });
}

export default {
  userDetails,
  verifyUser,
  createUser,
}
