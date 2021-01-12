const db = require("../ultils/db");

module.exports = {
    async getTeacherList() {
        const list = await db.promise().execute(
            `SELECT * FROM teacher`
        );
        if(list[0].length == 0){
            return 0;
        }
        return list[0];
    },

    async getTeacherData(username) {
        const teacher = await db.promise().execute(
            `SELECT * FROM teacher WHERE username = '${username}'`
        );
        if(teacher[0].length == 0){
            return 0;
        }
        return teacher[0];
    },

    async createTeacher(username,password){
        const user = await db.promise().execute(
            `(SELECT username FROM teacher WHERE username = '${username}')`
        );
        if(user[0] == 0){
         await db.promise().execute(
                `INSERT INTO teacher (username,password) VALUES ('${username}','${password}')`);
            return 1;
        }
        return 0;
    },
    async signIn(username,password){
        const state = await db.promise().execute(
            `SELECT username FROM teacher WHERE username = '${username}' AND password = '${password}' `
        );
        console.log(state[0].length)
        if(state[0].length === 0){
            return 0;
        }
        return 1;
    }
}