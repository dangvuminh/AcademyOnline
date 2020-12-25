const db = require("../../ultils/db");

module.exports = {
       async addComment(comment,courseID,studentID) {
        const state = await db.promise().execute(`INSERT INTO feedback (feedback_content,course_id,student_id) VALUES ('${comment}',${courseID},${studentID} )`);
        if(state[0] == 0)
        return 0;
        return 1;
    },
async getCommentList(courseID){
    const list = await db.promise().execute(`SELECT f.feedback_content,f.feedback_time,(SELECT s.username FROM student s WHERE f.student_id = s.student_id) AS student_name FROM feedback f WHERE f.course_id = ${courseID}`);
    if(list[0] == 0)
    return 0;
    return list[0];
}
}