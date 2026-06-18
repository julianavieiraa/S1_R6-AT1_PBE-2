import createMulter from "../config/produto.multer.js";

const uploadImage = createMulter ({ 
    folder: 'images',
    allowedTypes: ['Images/jpeg', 'image/png'],
    fileSize: 10 * 1024* 1024
}).single('image');

export default uploadImage;

