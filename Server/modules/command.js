const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const makePath = (programName) => {
  const path = `${__dirname}/../../bin/${programName}`
  return path
}

const makeParams = (params) => {
  return params
}

const runCommand = (path, params, out, err) => {
  console.log(path, params)
  try {
    spawn(path, params, {
      stdio: ['ignore', out, err],
      detached: true
    }).unref()
  } catch (ex) {

  }
}

const runBuildIndex = (params, success) => {
  const path = makePath('impulse_ml_dataset')
  const commandParams = makeParams(params)
  const out = fs.openSync(makePath('logs/out.log'), 'a')
  const err = fs.openSync(makePath('logs/err.log'), 'a')
  exec(`${path} ${params.join(' ')}`).then(() => {
    success()
  })
}

exports.runBuildIndex = runBuildIndex
