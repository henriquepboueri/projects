<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const guides = await res.json();

    if (res.ok) {
      return {
        props: {
          //   guides: guides, --same as below
          guides,
        },
      };
    }

    return {
      status: res.status,
      error: new Error('Could not fetch the guides'),
    };
  }
</script>

<script>
  export let guides;
</script>

<div class="guides">
  <ul>
    {#each guides as guide}
      <li><a href="/guides/{guide.id}">{guide.title}</a></li>
    {/each}
  </ul>
</div>

<style>
  .guides {
    margin-top: 20px;
  }
  ul {
    list-style: none;
  }
  a {
    display: inline-block;
    margin-top: 10px;
    padding: 10px;
    border: 1px dotted rgba(255, 255, 255, 0.2);
  }
</style>
