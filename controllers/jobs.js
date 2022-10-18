const getAllJobs = async (req, res) => {
  res.send('get all jobs ')
}
const getJob = async (req, res) => {
  res.send('get Job')
}
const createJob = async (req, res) => {
  res.send('Create Job ')
}
const updateJob = async (req, res) => {
  res.send('update Job ')
}
const deleteJob = async (req, res) => {
  res.send('delete job')
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
