<template>
  <NavbarComponents></NavbarComponents>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>



<script>
import NavbarComponents from '@/components/NavbarComponents.vue';
export default{
  name:'AboutView',
  components:
  {
    NavbarComponents
  }

}
</script>