<script lang="ts">
  import { Table } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';

  const game = {
    id: 1,
    name: 'Xenoblade Chronicles 3',
    release_date: '2022-07-29',
    website: 'https://www.nintendo.co.jp/switch/az3ha/',
    description:
      'Join Noah and Mio, members of the two opposing nations of Keves and Agnus, on a heartfelt journey through a warring world with a dark secret. Traverse massive, fantastical landscapes and master seamless real-time RPG combat as you expose the true enemy pulling the strings.',
    franchise: 'Xenoblade Chronicles',
    platform: 'Nintendo Switch',
    genre: 'Action, JRPG'
  };

  const producer: TableSource = {
    head: ['Producers'],
    body: [['Nintendo'], ['Monolith Soft']] // publishers and developers
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
    body: [['Expansion Pass', 'The Xenoblade Chronicles 3 Expansion Pass includes access to multiple waves of DLC content.']]
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
