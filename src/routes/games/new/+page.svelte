<script>
  import { goto } from '$app/navigation';
  import ValidForm from '$lib/components/forms/ValidForm.svelte';
  import ValidInput from '$lib/components/forms/ValidInput.svelte';
  import { formSchema } from './form';
</script>

<div class="container mx-auto p-6">
  <h1 class="h1 my-6 font-bold w-full text-center">Add New Game</h1>
  <ValidForm
    class="w-full max-w-lg mx-auto"
    submitText="Add Game"
    {formSchema}
    onSuccess={() => goto('/games')}
  >
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <ValidInput
          id="name"
          name="name"
          type="text"
          label="Name"
          required
          placeholder="Enter game name"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <ValidInput label="Release Date" name="releaseDate" type="date" placeholder="YYYY-MM-DD" />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <ValidInput
          label="Website"
          id="website"
          name="website"
          type="url"
          placeholder="Enter game website"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <ValidInput
          label="Description"
          elementType="textarea"
          class="textarea"
          id="description"
          name="description"
          rows="5"
          placeholder="Enter game description"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <ValidInput
          label="Publisher"
          id="publisher"
          name="publisher"
          type="text"
          placeholder="Enter game publisher"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <ValidInput
          label="Developer"
          id="developer"
          name="developer"
          type="text"
          placeholder="Enter game developer"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <ValidInput
          label="Franchise"
          id="franchise"
          name="franchise"
          type="text"
          placeholder="Enter game franchise"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <ValidInput
          label="Platform"
          id="platform"
          name="platform"
          type="text"
          placeholder="Enter game platform"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full px-3">
        <ValidInput
          label="Genre"
          id="genre"
          name="genre"
          type="text"
          placeholder="Enter game genre"
        />
      </div>
    </div>
  </ValidForm>
</div>
