export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
    return cb(new Error('This format not allowed'), false)
  }
  cb(null, true)
}