<script lang="ts">
  import { Table } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';

  const userName = 'dvd';

  const userTotalHoursPlayed: TableSource = {
    head: ['Total Hours Played'],
    body: [['2062']]
  };

  const userTotalMoneySpent: TableSource = {
    head: ['Total Money Spent'],
    body: [['$86.86']]
  };

  const userFavorites: TableSource = {
    head: ['Game', 'Hours Played', 'Money Spent'],
    body: [
      ['Xenoblade Chronicles 2', '62', '$59.99'],
      ['Rocket League', '2000', '$26.87']
    ]
  };

  const userGameReviews: TableSource = {
    head: ['Game', 'Review', 'Rating'],
    body: [
      ['Xenoblade Chronicles 2', 'idk', '8/10'],
      ['Rocket League', 'fun', '8/10']
    ]
  };
</script>

<div>
  <div class="p-8">
    <div class="card p-8">
      <h1 class="h1 flex justify-center"><b>{userName}</b></h1>
    </div>
  </div>

  <hr class="!border-t-8" />
  <div class="p-8">
    <div class="card p-4">
      <h3 class="h3 text-primary-500"><b>Overall Statistics</b></h3>
    </div>
  </div>
  <div class="flex px-4 pb-8">
    <Table source={userTotalHoursPlayed} class="px-4" />
    <Table source={userTotalMoneySpent} class="px-4" />
  </div>

  <hr class="!border-t-8" />
  <div class="p-8">
    <div class="card p-4">
      <h3 class="h3 text-primary-500"><b>Favorites</b></h3>
    </div>
  </div>
  <Table source={userFavorites} class="px-8 pb-8" />

  <hr class="!border-t-8" />
  <div class="p-8">
    <div class="card p-4">
      <h3 class="h3 text-primary-500"><b>Reviews</b></h3>
    </div>
  </div>
  <Table source={userGameReviews} class="px-8 pb-8" />
</div>
