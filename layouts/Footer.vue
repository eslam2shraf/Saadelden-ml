<template>
  <div>
    <BackToTopButton />
    <footer class="bg_NORDIC">
      <div class="container">
        <div class="row">
          <div class="col-md-9 col-11">
            <p>Copyright &copy; 2023, All Right Reserved</p>
          </div>
          <div class="col-md-2 col-11">
            <p>
              <a href="https://atw.llc" target="_blank" rel="noreferrer">
                <img class="icon-logo" src="@/static/atw_logo.png" />
              </a>
            </p>
          </div>
        </div>
     </div>
    </footer>
  </div>

</template>

<script>
import BackToTopButton from './BackToTopButton.vue';
export default {
    name: "TheFooter",
    components: { BackToTopButton }
};
</script>

<style>
</style>