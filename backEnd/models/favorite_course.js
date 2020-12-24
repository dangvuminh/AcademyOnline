const db = require("../ultils/db");

module.exports = {
    async getFavoriteCourseState(courseID){
        const state = await db.promise().execute(`SELECT f_student_id_fk FROM favorite_course WHERE f_course_id_fk = ${courseID}`);
        if(state[0] == 0)
        return 0;
        return state[0];
    },
    
    async changeFavoriteCourseState(courseID,studentID,state){
        let list = "";
        if(state == false){
             list = await db.promise().execute(
                `INSERT INTO favorite_course ( f_course_id_fk,f_student_id_fk ) VALUES (${courseID},${studentID})
                `
                );
        } else{
             list = await db.promise().execute(
                `DELETE FROM favorite_course WHERE f_student_id_fk = ${studentID} AND f_course_id_fk = ${courseID}
                `
                );
       }
       
        if(list[0] == 0)
        return 0;
        return 1;
    },

    async getAll(studentID) {
       
         const list = await db.promise().execute(
             `SELECT c.course_name,t.teacher_name 
         FROM course c LEFT JOIN 
         teacher t ON c.teacher_fk = t.teacher_id
         LEFT JOIN favorite_course f ON c.course_id  = f.f_course_id_fk
         WHERE f.f_student_id_fk = ${studentID}
         `
         );
       
        if (list[0] == 0)
            return 0;
        return list[0];
    },
}