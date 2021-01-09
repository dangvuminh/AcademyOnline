const db = require("../ultils/db");

module.exports = {
async updatePassword(username,newPassword){
    const state = await db.promise().execute(`UPDATE student SET password = '${newPassword}' WHERE username = '${username}'`);
    if(state[0] == 0)
    return 0;
    return 1;
},

async updateProfile(username,firstname,lastname,email){
    const state = await db.promise().execute(`UPDATE student SET student_firstname = '${firstname}',student_lastname = '${lastname}',email = '${email}' 
    WHERE username = '${username}'`);
    if(state[0] == 0)
    return 0;
    return 1;
}

}