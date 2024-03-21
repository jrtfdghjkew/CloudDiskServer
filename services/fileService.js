const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileService {

    createDir(req, file) {
        const filePath = this.getPath(req,file)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        let goodPath = file.path.replace(file.name, '')
        return config.get('filePath') + '\\' + file.user + '\\' + goodPath + '\\' + file.name
        // return req.filePath + '\\' + file.user + '\\' + goodPath + '\\' + file.name
    }
}


module.exports = new FileService()