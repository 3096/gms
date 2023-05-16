<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton';

  export let data;

  let isFocused: boolean = true;

  let filterInput = '';
</script>

<div>
  <div class="p-8 grid grid-cols-3">
    <div />
    <h1 class="h1 flex justify-center items-center"><b>List of Games</b></h1>

    <!-- <form class="justify-self-end" use:focusTrap={isFocused}>
      <input type="text" class="w-[400px] input" placeholder="Search..." />
      <button class="btn variant-filled-primary">➤</button>
    </form> -->
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
        {#each data.gameSourceData as game}
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
