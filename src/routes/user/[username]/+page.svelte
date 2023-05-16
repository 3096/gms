<script lang="ts">
  import {
    Table,
    tableMapperValues,
    tableSourceMapper,
    tableSourceValues
  } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import Header from '$lib/components/headers/Header.svelte';

  export let data;

  const user = data.userData;
  if (user == undefined) process.exit();

  console.log(data);

  const userName = user.username;

  const userTotalHoursPlayed: TableSource = {
    head: ['Total Hours Played'],
    body: tableMapperValues([data.hourSum], ['sum'])
  };

  const userTotalMoneySpent: TableSource = {
    head: ['Total Money Spent'],
    body: tableMapperValues([data.moneySum], ['sum'])
  };

  const userFavorites: TableSource = {
    head: ['Game', 'Hours Played', 'Money Spent'],
    body: tableMapperValues(data.favList, ['name', 'hours_played', 'money_spent'])
  };

  const userGameReviews: TableSource = {
    head: ['Game', 'Review', 'Rating'],
    body: tableMapperValues(data.reviews, ['name', 'review', 'rating'])
  };
</script>

<div>
  <div class="p-8">
    <div class="card p-8">
      <h1 class="h1 flex justify-center"><b>{userName}</b></h1>
    </div>
  </div>

  <Header text="Overall Statistics" />
  <div class="flex px-4 pb-8">
    <Table source={userTotalHoursPlayed} class="px-4" />
    <Table source={userTotalMoneySpent} class="px-4" />
  </div>

  <Header text="Favorites" />
  <Table source={userFavorites} class="px-8 pb-8" />

  <Header text="Reviews" />
  <Table source={userGameReviews} class="px-8 pb-8" />
</div>
