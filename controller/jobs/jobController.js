const Response = require("../../helper/errHandel");
const jobModel = require("../../models/jobModel");
const mongoose = require('mongoose');


// ============= CREATE JOB  =================
const jobCreate = async (req, res) => {
    try {
        const { company, position } = req.body
        if (!company || !position) {
            const obj = {
                res,
                status: 401,
                messages: "pleash  Provide all fields"
            }
            return Response.Error(obj);
        }
        req.body.createdBy = req.userId
        const job = await jobModel.create(req.body)
        const obj = {
            res,
            status: 200,
            messages: "Post job",
            data: job
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}

// =========== GetaLL JOB   ===============
const jobgetAll = async (req, res) => {
    try {
        const jobs = await jobModel.find()
        if (!jobs) {
            const obj = {
                res,
                status: 402,
                messages: "no need to job"
            }
            return Response.Error(obj);
        }
        const obj = {
            res,
            status: 200,
            totaljob: jobs.length,
            messages: "find all job ",
            data: jobs
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}
// =========== Get JOB   ===============
const jobget = async (req, res) => {
    try {
        const { status, workType, search } = req.query;

        console.log("Query Parameters:", { status, workType, search });

        const query = {
            createdBy: req.userId
        };

        if (status) {
            query.status = status;
        }
        if (workType) {
            query.workType = workType;
        }
        if (search) {
            query.position = { $regex: search, $options: 'i' };
        }
        const jobs = await jobModel.find(query);
        const obj = {
            res,
            status: 200,
            totaljob: jobs.length,
            messages: "Found all jobs",
            data: jobs
        };

        return Response.success(obj);
    } catch (error) {
        console.error("Error fetching jobs:", error); 
        const obj = {
            res,
            status: 500,
            messages: "An error occurred while fetching jobs."
        };
        return Response.Error(obj);
    }
}

// =========== update JOB   ===============
const updateJob = async (req, res) => {
    try {
        const jobs = await jobModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!jobs) {
            const obj = {
                res,
                status: 402,
                messages: "no need to job"
            }
            return Response.Error(obj);
        }
        const obj = {
            res,
            status: 200,
            messages: "update job",
            data: jobs
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}
const deletejob = async (req, res) => {
    try {
        const job = await jobModel.deleteOne({ _id: req.params.id });
        if (!job) {
            const obj = {
                res,
                status: 402,
                messages: "pleash vaild id"
            }
            return Response.Error(obj);
        }
        const obj = {
            res,
            status: 200,
            messages: "job post is delete",
            data: job
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}

//=========job-state============
const jobState = async (req, res) => {
    try {

        const stats = await jobModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                }
            },
        ]);
        const obj = {
            res,
            status: 200,
            messages: "jobstats",
            data: stats
        }
        return Response.success(obj);
    } catch (error) {
        const obj = {
            res,
            status: 500,
            messages: error.stack
        }
        return Response.Error(obj);
    }
}
module.exports = { jobCreate, jobget, jobgetAll, updateJob, deletejob, jobState }
