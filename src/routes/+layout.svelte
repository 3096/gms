<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import '../theme.postcss';
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  // Most of your app wide CSS should be put in this file
  import '../app.postcss';

  import { AppBar, AppShell } from '@skeletonlabs/skeleton';
  import Logo from '$lib/components/Logo.svelte';
</script>

<AppShell>
  <!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
  <!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
  <!-- (sidebarRight) -->
  <AppBar slot="pageHeader" gridColumns="1">
    <div class="flex">
      <Logo />
    </div>
  </AppBar>
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <AppBar slot="pageFooter" gridColumns="1">
    <div class="flex justify-center">
      <span>Copyright © 2023 Gamementship</span>
    </div>
  </AppBar>
  <!-- (footer) -->
</AppShell>
