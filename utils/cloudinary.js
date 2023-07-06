import cloudinary from 'cloudinary';
// https://console.cloudinary.com/
cloudinary.config({
    cloud_name: "dy8hwpetl",
    api_key: "783212276674146",
    api_secret: "pnoTSMcSVZ4f6SNl0GReGaRsPL0"
  });





  export const cloudinaryUploadImg = async (fileUploads, vv) => {

    console.log('fileUploads', fileUploads);

    
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileUploads, (result) => {
            resolve({
                url: result.secure_url,
                asset_id: result?.asset_id,
                public_id: result?.public_id,
            },{
                secure_type: "auto",
            })
        })
    })
  }

  export const cloudinaryDeleteImg = async (fileToDelete, vv) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve({
                url: result.secure_url,
                asset_id: result?.asset_id,
                public_id: result?.public_id,
            },{
                secure_type: "auto",
            })
        })
    })
  }