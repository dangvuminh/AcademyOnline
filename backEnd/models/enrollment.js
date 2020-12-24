const db = require("../ultils/db");
module.exports = {
    async createEnrollment(courseID, studentID) {
        console.log("HOHO");
        const single = await db.promise().execute(`INSERT INTO enrollment (course_id_fk,student_id_fk) VALUES ('${courseID}','${studentID}')`);
        if (single[0].length == 0)
            return 0;
        return 1;
    },

    async getAll(studentID) {
        //  const list = await db.promise().execute(`SELECT e.course_id_fk ,( SELECT c.course_name FROM course c WHERE c.course_id = e.course_id_fk ) as course_name
        //  FROM enrollment e WHERE e.student_id_fk = ${studentID}`);
         
         const list = await db.promise().execute(
             `SELECT c.course_name,t.teacher_name 
         FROM course c LEFT JOIN 
         teacher t ON c.teacher_fk = t.teacher_id
         LEFT JOIN enrollment e ON c.course_id  = e.course_id_fk
         WHERE e.student_id_fk = ${studentID}
         `
         );
       
        if (list[0] == 0)
            return 0;
        return list[0];
    },
   

}