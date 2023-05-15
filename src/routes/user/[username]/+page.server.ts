import { queryUserByUsername } from '$lib/server/db/user.js';

export async function load({locals, params}) {

    return {
        userData: await queryUserByUsername(locals.sql, params.username)
    };
}