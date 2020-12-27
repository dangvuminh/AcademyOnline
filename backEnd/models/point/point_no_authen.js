const db = require("../../ultils/db");

module.exports = {
    async getPointsByID(courseID){
        const state = await db.promise().execute(`SELECT enrollment_point FROM enrollment WHERE course_id_fk = ${courseID}`);
        if(state[0].length == 0)
        return 0;
        return state[0];
    },
}

