const fs=require("fs/promises")
const filePath = "./models/tasks.json"
const updateContacts = async(task)=> {
    await fs.writeFile(filePath, JSON.stringify(task));
}

module.exports = updateContacts;