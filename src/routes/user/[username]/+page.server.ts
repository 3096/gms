import { queryUserByUsername } from '$lib/server/db/user.js';
import {
  queryTotalHours,
  queryTotalMoney,
  queryUserFavorite,
  queryUserReview
} from '$lib/server/db/user_game.js';

export async function load({ locals, params }) {
  const sql = locals.sql;

  const userData = await queryUserByUsername(sql, params.username);
  const userID = userData.id;

  return {
    userData,
    favList: queryUserFavorite(sql, userID),

    hourSum: queryTotalHours(sql, userID),
    moneySum: queryTotalMoney(sql, userID),

    reviews: queryUserReview(sql, userID)
  };
}
