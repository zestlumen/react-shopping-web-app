export async function uploadImage(file) {

    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    // data.append('timestamp',signData.timeStamp);
    // data.append('signature',signData.signature);


    return fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((data) => data.url);

}

