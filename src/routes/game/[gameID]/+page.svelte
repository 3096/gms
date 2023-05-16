<script lang="ts">
  import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';

  export let data;
  console.log(data);

  const game = data.gameData;

  const producer: TableSource = {
    // publishers and developers
    head: ['Producers'],
    body: tableMapperValues(data.producers, ['name'])
  };

  const platform: TableSource = {
    head: ['Platforms'],
    body: [[game.platform]]
  };

  const genre: TableSource = {
    head: ['Genres'],
    body: [[game.genre]]
  };

  const dlc: TableSource = {
    head: ['DLC', 'Description'],
    body: tableMapperValues(data.dlc, ['name','description'])
  };
</script>

<div>
  <div class="p-8">
    <div class="card p-8 justify-center">
      <h1 class="h1 flex justify-center"><b>{game.name}</b></h1>
      <p class="flex justify-center pb-8"><i>{game.franchise}</i></p>
      <a href={game.website} class="flex justify-center items-center text-primary-500">
        <u>{game.website}</u>
      </a>
    </div>
  </div>

  <hr class="!border-t-8 pb-8" />
  <div class="flex justify-center px-4 pb-8">
    <Table source={platform} class="px-4" />
    <Table source={genre} class="px-4" />
  </div>

  <div class="px-8 pb-8">
    <div class="card p-8 justify-center">
      <h1 class="h1 pb-8 text-primary-500"><b>Description</b></h1>
      <p>{game.description}</p>
    </div>
  </div>

  <Table source={dlc} class="px-8 pb-8" />

  <Table source={producer} class="px-8 pb-8" />
</div>
