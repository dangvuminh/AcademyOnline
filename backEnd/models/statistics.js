const db = require("../ultils/db");

module.exports = {
    async getMostEnrolled() {
        const list = await db.promise().execute(
            `SELECT c.course_name,c.num_of_enrollments , (SELECT t.teacher_name FROM teacher t WHERE t.teacher_id = c.teacher_fk) AS teacher_name
            FROM course c`
        );
        if(list[0].length == 0){
            return 0;
        }
        return list[0];
    },
}