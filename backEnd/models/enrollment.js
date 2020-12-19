module.exports = {
    async createEnrollment(courseID,studentID){
        const single = await db.promise().execute(`INSERT INTO enrollment (course_id_fk,student_id_fk) VALUES ('${courseID}','${studentID}')`);
        if(single[0].length == 0)
        return 0;
        return 1;
    }
    
    }