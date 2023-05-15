import type { Actions } from './$types';
import { formSchema } from './form';
import type { FormErrorData } from '$lib/components/forms/types';
import { fail, type ActionFailure } from '@sveltejs/kit';
import { insertUser, queryUserByUsername } from '$lib/server/db/user';

export const actions = {
  default: async ({ request, locals }) => {
    const parseResult = formSchema.safeParse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (!parseResult.success) {
      console.error(parseResult.error);
      return fail<FormErrorData>(400, { errorMessages: ['Invalid form data'] });
    }

    const { username } = parseResult.data;

    // check if username exists
    if (await queryUserByUsername(locals.sql, username)) {
      return fail<FormErrorData>(400, { errorMessages: ['Username already exists'] });
    }

    // create user
    await insertUser(locals.sql, username);

  }
} satisfies Actions<void | ActionFailure<FormErrorData>>;
