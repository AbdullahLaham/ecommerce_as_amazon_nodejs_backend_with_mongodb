import cloudinary from 'cloudinary';
// https://console.cloudinary.com/
cloudinary.config({
    cloud_name: "dy8hwpetl",
    api_key: "783212276674146",
    api_secret: "pnoTSMcSVZ4f6SNl0GReGaRsPL0"
  });

  export const cloudinaryUploadImg = async (fileUploads, vv) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileUploads, (result) => {
            resolve({
                url: result.secure_url,
            },{
                secure_type: "auto",
            })
        })
    })
  }