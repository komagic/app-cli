const fs = require('fs');

const exists = async(input)=>{
    try {
    const stat = await fs.promises.stat(input)
    if (stat.isDirectory()) {
        return 'dir'
      } else if (stat.isFile()) {
        return 'file'
      } else {
        return 'other'
      }
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
          }
          return false
    }
}

const isDirectory = async(input)=>{
    const result = await exists(input)
    return result === 'file'
}


/**
 * Check input is empty.
 * @param input input path
 */
 const isEmpty = async (input) => {
    const files = await fs.promises.readdir(input)
    return files.length === 0
  }

/**
 * Remove input dir or file. recursive when dir
 * require node >= v12.10
 * @param input input path
 */
const remove = async (input, options={}) => {
    const result = await exists(input)
    if (result === false) return
    // file or other
    if (result !== 'dir') return await fs.promises.unlink(input)
    // dir
    await fs.promises.rm(input, { recursive: true, ...options })
  }  

  module.exports ={
    exists,
    isDirectory,
    isEmpty,
    remove
  }