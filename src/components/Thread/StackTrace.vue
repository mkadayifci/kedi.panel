<template>
  <div>
    <h6>Call Stack</h6>
    <template>
      <b-table
        tbody-class="tbodyOuterBeige"
        thead-class="tHead"
        style="white-space: pre;"
        hover
        :items="items"
      ></b-table>
    </template>
  </div>
</template>
    <script>
export default {
  name: "StackTrace",
  props: ["items"]
};
</script>



