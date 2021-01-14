const db = require("../ultils/db");

module.exports = {
       async addVideo(videoName,videoUrl,teacherID,courseID) {
        const video = await db.promise().execute(`INSERT INTO video (video_name,video_url,teacher_id_fk,v_course_id_fk) VALUES ('${videoName}','${videoUrl}',${teacherID},${courseID})`);
        if(video[0].affectedRows === 0 ){
            return 0;
        }
        return 1;
    },
    async getVideoByCourseID(courseID) {
        //const video = await db.promise().execute(`SELECT c.course_id,c.teacher_fk,(SELECT v.video_url FROM video v WHERE c.teacher_fk = v.teacher_id_fk) AS video_url FROM course c WHERE c.course_id = ${courseID}`);
        const video = await db.promise().execute(`SELECT video_url,teacher_id_fk FROM video WHERE v_course_id_fk = ${courseID}`);
        if(video[0].length === 0 ){
            return 0;
        }
        return video[0];
    },
}