const getImageDataUri = (imageBlob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
    });
};

const displayImage = async (imageBlob) => {
    try {
        const imageDataUri = await getImageDataUri(imageBlob);
        const mimeType = imageBlob.type;

        // Check the MIME type and set it accordingly in the src attribute
        const imgElement = document.createElement('img');
        imgElement.src = `data:${mimeType};base64,${imageDataUri}`;
        document.body.appendChild(imgElement);
    } catch (error) {
        console.error('Error displaying image:', error);
    }
};

export { getImageDataUri, displayImage };