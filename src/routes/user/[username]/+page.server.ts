import { queryUserByUsername } from '$lib/server/db/user.js';
import {
  queryTotalHours,
  queryTotalMoney,
  queryUserFavorite,
  queryUserReview
} from '$lib/server/db/user_game.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const sql = locals.sql;

  const userData = await queryUserByUsername(sql, params.username);
  if (!userData) {
    throw error(404, { message: 'User not found' });
  }

  const userID = userData.id;

  return {
    userData,
    favList: queryUserFavorite(sql, userID),

    hourSum: queryTotalHours(sql, userID),
    moneySum: queryTotalMoney(sql, userID),

    reviews: queryUserReview(sql, userID)
  };
}) satisfies PageServerLoad;
