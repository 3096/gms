<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let data;

  let isFocused: boolean = true;

  let filterInput = '';
</script>

<div>
  <div class="p-8 grid grid-cols-3">
    <div class="justify-self-end flex w-full" use:focusTrap={isFocused}>
      <input type="text" class="grow input mr-2" placeholder="Filter..." bind:value={filterInput} />
    </div>
    <h1 class="h1 flex justify-center items-center"><b>List of Games</b></h1>
    <button class="btn variant-filled-primary justify-self-end">
      <a href="/games/new">Add Game</a>
    </button>
  </div>

  <div class="px-8 pb-8 table-container">
    <table class="table table-interactive">
      <thead>
        <tr>
          <th class="text-primary-500">Name</th>
          <th class="text-primary-500">Release Date</th>
          <th class="text-primary-500">Platform</th>
          <th class="text-primary-500">Genre</th>
        </tr>
      </thead>

      <tbody>
        {#each data.gameSourceData.filter((game) => game.name
            .toLowerCase()
            .includes(filterInput.toLowerCase())) as game}
          <tr>
            <td><a href="/game/{game.game_id}">{game.name}</a></td>
            <td>{game.release_date}</td>
            <td>{game.platform}</td>
            <td>{game.genre}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
