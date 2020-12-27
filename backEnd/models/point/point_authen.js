const db = require("../../ultils/db");

module.exports = {
    async addPoint(courseID,studentID,point){
        const state = await db.promise().execute(`UPDATE enrollment SET enrollment_point = ${point} WHERE student_id_fk = ${studentID} AND course_id_fk = ${courseID}`);
        if(state[0] == 0)
        return 0;
        return 1;
    },
    async getState(courseID,studentID){
        const state = await db.promise().execute(`SELECT enrollment_point FROM enrollment WHERE student_id_fk = ${studentID} AND course_id_fk = ${courseID}`);
        if(state[0].length == 0)
        return 0;
        return state[0];
    },
}

