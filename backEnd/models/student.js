const db = require("../ultils/db");
const bcrypt = require("bcryptjs")

module.exports = {
    async createStudent(firstname,lastname,email,username,password){
       
        const user = await db.promise().execute(` (SELECT username FROM student WHERE username = '${username}')`);
       if(Object.keys(user[0]).length == 0){
        await db.promise().execute(`INSERT INTO student (student_firstname,student_lastname,email,username,password) VALUES ('${firstname}','${lastname}','${email}','${username}','${password}')`);
        return 1;
       }else{
            return 0;
       }
       
    },

    async getStudentSignIn(username,password){
       //const passwordDecoded = ;
       const user = await db.promise().execute(`SELECT * FROM student WHERE username = '${username}'`);
       if(user[0].length == 0){
        return -1;
       } else {
        return user[0].map((item)=>{
            if(!bcrypt.compareSync(password, item.password)){
                return 0;
            } else
            return item;
         })
       } 
    },

    async getStudentProfile(username){
        const user = await db.promise().execute(`SELECT * FROM student WHERE username = '${username}'`);
        return user[0];
    }
}