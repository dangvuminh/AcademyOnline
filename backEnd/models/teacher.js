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

}