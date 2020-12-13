const db = require("../ultils/db");

module.exports = {
    async getCoursesByCategory(category) {
        const list = await db.promise().execute(
            `SELECT c.course_id,c.course_name,c.course_content,c.course_price,c.category_type,
     (SELECT t.teacher_name FROM teacher t WHERE t.teacher_id = c.teacher_fk) AS teacher
     FROM course c WHERE c.category_type = ${category} `
        );
        return list[0];
    },
    async getSingle(courseID){
        const single = await db.promise().execute(`SELECT * FROM course WHERE course_id = ${courseID}`);
        return single[0];
    }
}