import type { Actions } from './$types';
import { formSchema } from './form';
import type { FormErrorData } from '$lib/components/forms/types';
import { fail, type ActionFailure } from '@sveltejs/kit';
import {
  insertDeveloper,
  insertDevelopmentship,
  insertGame,
  insertPublisher,
  insertPublishmentship,
  queryDeveloperByName,
  queryPublisherByName
} from '$lib/server/db/game';

export const actions = {
  default: async ({ request, locals }) => {
    const parseResult = formSchema.safeParse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (!parseResult.success) {
      console.error(parseResult.error);
      return fail<FormErrorData>(400, { errorMessages: ['Invalid form data'] });
    }
    try {
      const {
        name,
        releaseDate,
        website,
        description,
        franchise,
        platform,
        genre,
        developer,
        publisher
      } = parseResult.data;

      // check if developer exists
      let developerID;
      if (developer) {
        const existingDeveloper = (await queryDeveloperByName(locals.sql, developer))[0];
        if (existingDeveloper) {
          developerID = existingDeveloper.developer_id;
        } else {
          await insertDeveloper(locals.sql, developer);
          developerID = (await queryDeveloperByName(locals.sql, developer))[0].developer_id;
        }
      }

      // check if publisher exists
      let publisherID;
      if (publisher) {
        const existingPublisher = (await queryPublisherByName(locals.sql, publisher))[0];
        if (existingPublisher) {
          publisherID = existingPublisher.publisher_id;
        } else {
          await insertPublisher(locals.sql, publisher);
          publisherID = (await queryPublisherByName(locals.sql, publisher))[0].publisher_id;
        }
      }

      // insert game
      await insertGame(
        locals.sql,
        name,
        releaseDate || null,
        website ?? null,
        description ?? null,
        franchise ?? null,
        platform ?? null,
        genre ?? null
      );

      const [{ game_id }] = await locals.sql`SELECT game_id FROM game WHERE name = ${name}`;

      // insert developmentship
      if (developerID) {
        await insertDevelopmentship(locals.sql, game_id, developerID);
      }

      // insert publishmentship
      if (publisherID) {
        await insertPublishmentship(locals.sql, game_id, publisherID);
      }
    } catch (e) {
      console.error(e);
      return fail<FormErrorData>(500, { errorMessages: [(e as Error).message] });
    }
  }
} satisfies Actions<void | ActionFailure<FormErrorData>>;
