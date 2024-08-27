import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export async function uploadImageToStorage(filePath, originalFilename) {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}-${originalFilename}`,
        Body: fileContent,
        ContentType: 'image/jpeg', // Adjust based on your file type
    };

    const data = await s3.upload(params).promise();
    return data.Location; // URL to access the uploaded file
}
