// pages/api/download.js
const axios = require('axios');

export default async function downloadFile(mediaId, outputFilePath) {
    try {
        const response = await axios.get(`https://web-production-77aa.up.railway.app/assets/${mediaId}`, {
            responseType: 'arraybuffer',
        });

        fs.writeFile(outputFilePath, response.data, (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err.message);
            } else {
                console.log('Archivo descargado y guardado en:', outputFilePath);
            }
        });
    } catch (error) {
        console.error('Error al descargar el archivo:', error.message);
    }
}