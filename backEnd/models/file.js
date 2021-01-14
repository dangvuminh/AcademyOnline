const db = require("../ultils/db");

module.exports = {
       async addFile(fileName,fileUrl,teacherID,courseID) {
        const file = await db.promise().execute(`INSERT INTO file (file_name,file_url,file_teacher_id_fk,file_course_id_fk) VALUES ('${fileName}','${fileUrl}',${teacherID},${courseID})`);
        if(file[0].affectedRows === 0 ){
            return 0;
        }
        return 1;
    },
    async getFileByCourseID(courseID) {

         //const file = await db.promise().execute(`SELECT c.course_id,c.teacher_fk,(SELECT f.file_url FROM file f WHERE c.teacher_fk = f.file_teacher_id_fk) AS file_url FROM course c WHERE c.course_id = ${courseID}`);
         const file = await db.promise().execute(`SELECT file_url,file_teacher_id_fk FROM file WHERE file_course_id_fk = ${courseID}`)
        if(file[0].length === 0 ){
            return 0;
        }
        return file[0];
    },
}