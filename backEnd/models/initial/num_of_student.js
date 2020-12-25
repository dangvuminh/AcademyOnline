const db = require("../../ultils/db");

module.exports = {

async updateStudentNumber(){
    const state = await db.promise().execute(
        ` UPDATE course c
            SET c.num_of_enrollments = ( SELECT COUNT( e.course_id_fk ) 
                FROM enrollment e 
                     WHERE c.course_id = e.course_id_fk ) `
    );
  
   if(state[0].length == 0 ){
        return 0
    }
    return 1;
}
}