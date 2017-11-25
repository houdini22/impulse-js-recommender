const fs = require('fs')
const spawn = require('child_process').spawn

const makePath = (programName) => {
  const path = `${__dirname}/../../bin/${programName}`
  return path
}

const makeParams = (params) => {
  const result = []
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'boolean') {
      result.push(`-${params[key]}`)
    } else {
      result.push(`--${key}=${params[key]}`)
    }
  })
  return result
}

const runCommand = (path, params, out, err) => {
  console.log(path, params)
  spawn(path, params, {
    stdio: ['ignore', out, err],
    detached: true
  }).unref()
}

const runBuildIndex = (params) => {
  const path = makePath('impulse_ml_dataset')
  const commandParams = makeParams(params)
  const out = makePath('logs/out.log')
  const err = makePath('logs/err.log')
  runCommand(path, commandParams, out, err)
}

exports.runBuildIndex = runBuildIndex
