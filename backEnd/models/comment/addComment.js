const db = require("../../ultils/db");

module.exports = {
       async addComment(comment,courseID,studentID) {
        const state = await db.promise().execute(`INSERT INTO feedback (feedback_content,course_id,student_id) VALUES ('${comment}',${courseID},${studentID} )`);
        if(state[0] == 0)
        return 0;
        return 1;
    },
}