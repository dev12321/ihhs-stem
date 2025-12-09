
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } from '$env/static/private';
import { PUBLIC_R2_DOMAIN } from '$env/static/public';

const R2 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

export async function getPresignedUrl(key: string, contentType: string) {
    const newKey = `stem/${new Date().getFullYear()}/${key}`
    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: newKey,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(R2, command, { expiresIn: 3600 });
    const publicUrl = `${PUBLIC_R2_DOMAIN}/${newKey}`;

    return { uploadUrl, publicUrl };
}
