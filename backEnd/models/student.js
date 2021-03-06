const db = require("../ultils/db");
const bcrypt = require("bcryptjs");

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

    async validateStudent(username,password){
       //const passwordDecoded = ;
       const user = await db.promise().execute(`SELECT * FROM student WHERE username = '${username}'`);
       if(user[0] == 0){
        return -1;
       } else {
        return user[0].map((item)=>{
            if(!bcrypt.compareSync(password, item.password)){
                return 0;
            } 
            else
            return item;
           
         })
       } 
    },
    async updateRefrsehToken(username,refreshToken){
        const update = await db.promise().execute(`UPDATE student SET refreshToken = '${refreshToken}' WHERE username = '${username}'`);
        return update[0];
    },
    async findRefreshToken(refreshToken){
        const user = await db.promise().execute(`SELECT student_id,refreshToken FROM student WHERE refreshToken = '${refreshToken}' `);
        return user[0].map((item)=>{
            return item;
        })
    },
    async getStudentData(username){
        const user = await db.promise().execute(`SELECT * FROM student WHERE username = '${username}'`);
        return user[0];
    },
    async uploadImage(studentID,image){
        const state = await db.promise().execute(`UPDATE student SET student_image = '${image}' WHERE student_id = ${studentID}`);
        if(state[0].affectedRows  ===  0)
        return 0;
        return 1;
    },

}