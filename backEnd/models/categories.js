const db = require("../ultils/db");

module.exports = {
       async getCategories  () {
        const list = await db.promise().execute("SELECT * FROM category");
        return list[0];
    }
}