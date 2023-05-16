<script>
  import { goto } from '$app/navigation';
  import ValidForm from '$lib/components/forms/ValidForm.svelte';
  import ValidInput from '$lib/components/forms/ValidInput.svelte';
  import { formSchema } from './form';

  let username = '';
</script>

<div class="card max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
  <h1 class="text-2xl font-medium mb-5">Join GMS</h1>
  <ValidForm submitText="Sign Up" {formSchema} onSuccess={() => goto(`/user/${username}`)}>
    <ValidInput
      label="Choose a username"
      type="text"
      name="username"
      placeholder="EpicLlama420"
      required
      bind:value={username}
    />
  </ValidForm>
</div>
