<script>
  export let title = 'Default title';
</script>

<div class="title">
  <img src="/controller.svg" alt="" srcset="" />
  <h1>{title}</h1>
</div>

<style>
  .title {
    display: flex;
  }
  .title img {
    display: inline-block;
    filter: invert(88%) sepia(18%) saturate(86%) hue-rotate(199deg)
      brightness(100%) contrast(90%);
    width: 2.5rem;
  }
  .title h1 {
    margin-left: 10px;
  }
</style>
