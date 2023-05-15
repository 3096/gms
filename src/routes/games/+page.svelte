<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton';

    export let data;
    
    // const gameSourceData = [
    // {
    //   id: 1,
    //   name: 'Xenoblade Chronicles 3',
    //   release_date: '2022-07-29',
    //   platform: 'Nintendo Switch',
    //   genre: 'Action, JRPG'
    // },
    // {
    //   id: 2,
    //   name: 'Rocket League',
    //   release_date: '2015-07-07',
    //   platform: 'PC, PS4, Xbox One, Nintendo Switch',
    //   genre: 'Sports, Driving'
    // }
  // ];
  
  let isFocused: boolean = true;
</script>

<div>
  <div class="p-8 grid grid-cols-3">
    <div />
    <h1 class="h1 flex justify-center items-center"><b>List of Games</b></h1>

    <form class="justify-self-end" use:focusTrap={isFocused}>
      <input type="text" class="w-[400px] input" placeholder="Search..." />
      <button class="btn variant-filled-primary">➤</button>
    </form>
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
            <td>{game.name}</td>
            <td>{game.release_date}</td>
            <td>{game.platform}</td>
            <td>{game.genre}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
