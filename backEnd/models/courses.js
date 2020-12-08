const db = require("../ultils/db");

module.exports = {
    async getCoursesByCategory(category) {
        const list = await db.promise().execute(
            `SELECT c.course_name,c.course_price,
     (SELECT t.teacher_name FROM teacher t WHERE t.teacher_id = c.teacher_fk) AS teacher
     FROM course c WHERE c.category_type = ${category} `
        );
        return list[0];
    }
}