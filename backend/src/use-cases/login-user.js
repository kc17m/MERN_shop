const { findUserByEmail } = require("../db-access/users-dao")
const { makeUser } = require("../domain/User")
const { createPasswordHash, createToken } = require("../utils/hash")

async function loginUser({ email, password }) {

    // step 1 - gibts die den user mit dieser email adresse überhaupt
    // step 2 - password prüfen
    // step 3 - error - error schicken, wenn das password nicht stimmt
    // step 4 - success - token erzeugen und verschicken (wenn beides okay)

    const invalidMsg1 = "Invalid Login"
    const invalidMsg2 = "Invalid Login2"

    //1.
    const foundUser = await findUserByEmail(email)// user finden über DAO - db.collection("Users").findOne({ email: email })
    if (!foundUser) {
        throw new Error(invalidMsg1) ///funktioniert
    }


    //2.
    const user = makeUser(foundUser)
    console.log("user", user);
    const passwordHash = createPasswordHash(password, user.passwordSalt)

    const correctPassword = user.passwordHash === passwordHash //true or false 
    console.log("userpHash vs. pwhash", user.passwordHash, passwordHash);

    if (!correctPassword) {
        throw new Error(invalidMsg2) //FEHLER!! WO???
    }
    const token = createToken(user)
    console.log("Token from usecase ", token);
    return token


}



module.exports = {
    loginUser
}