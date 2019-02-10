<template>
  <div>
    <h6>Stack Objects</h6>
    <template>
      <ObjectList :items="items"/>
    </template>
  </div>
</template>
<script>
import numberHelper from "@/helpers/number-helper";
import ObjectList from "@/components/Common/ObjectList.vue";

export default {
  name: "StackObjects",
  components:{ObjectList},
  props: ["items"],
  methods: {},
  data: function() {
    return {
    };
  }
};
</script>
