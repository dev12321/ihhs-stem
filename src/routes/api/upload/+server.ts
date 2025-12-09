
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPresignedUrl } from '$lib/server/r2';
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request, locals }) => {
    const { session } = await locals.safeGetSession();

    if (!session) {
        throw error(401, 'Unauthorized');
    }

    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
        throw error(400, 'Filename and content type are required');
    }

    const ext = filename.split('.').pop();
    const key = `${uuidv4()}.${ext}`;

    try {
        const { uploadUrl, publicUrl } = await getPresignedUrl(key, contentType);
        return json({ uploadUrl, publicUrl });
    } catch (err) {
        console.error('R2 URL generation error:', err);
        throw error(500, 'Failed to generate upload URL');
    }
};
