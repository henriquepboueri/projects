<script>
  import Title from '$lib/title.svelte';
  import '../styles/global.css';

  const year = new Date().getFullYear();
</script>

<header>
  <Title title="A title from layout component" />
</header>

<main>
  <!-- page content -->
  <slot />
</main>

<footer><p>Copyright {year}</p></footer>

<style>
  header {
    display: flex;
    justify-content: center;
  }
  main {
    max-width: 960px;
    margin: 20px auto;
  }
  footer {
    text-align: center;
  }
</style>
