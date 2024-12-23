const express = require('express');
const app = express();

const register = require('../../controller/user/register');
const login = require('../../controller/user/login');
const updateuser = require('../../controller/user/userController');
const userAuth = require('../../middleware/authmidelware');
const { jobCreate,jobget, jobgetAll, updateJob, deletejob, jobState } = require('../../controller/jobs/jobController');

app.post('/register', register)
app.post('/login', login)
app.put('/updateuser', userAuth, updateuser)

// ========job create========
app.post("/create-job", userAuth, jobCreate)
// ========job Get========
app.get("/getall-job", userAuth, jobgetAll)
app.get("/get-job", userAuth, jobget)
// ========job Update========
app.put("/update-job/:id", userAuth, updateJob)
// ========job delete========
app.delete("/delete-job/:id", userAuth, deletejob)
// ========job stats========
app.get("/stats-job", userAuth, jobState)


module.exports = app