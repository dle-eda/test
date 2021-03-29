module.exports.success = (message) => {
  return {
    success: true,
    error: null,
    message
  }
}

module.exports.error = (message) => {
  return {
    error: true,
    success: null,
    message
  }
}