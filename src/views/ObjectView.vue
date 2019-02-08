

<template>
  <div class="container-fluid pt-80">
    <h5>Object Inspector</h5>
    <hr>
    <TopBar/>

    <div>Address: {{this.objectDetail.objectPointer}}</div>
    <div>HexAddress: {{this.objectDetail.hexAddress}}</div>
    <div>MethodTable: {{this.objectDetail.methodTable}}</div>
    <div>Module: {{this.objectDetail.module}}</div>
    <div>ElementType: {{this.objectDetail.elementType}}</div>
    <div>TypeName: {{this.objectDetail.typeName}}</div>
    <div>BaseTypeName: {{this.objectDetail.baseTypeName}}</div>

    <div>Size: {{this.objectDetail.size}}</div>
    <div>IsArray: {{this.objectDetail.isArray}}</div>
    <div>IsBoxed: {{this.objectDetail.isBoxed}}</div>
    <div>IsNull: {{this.objectDetail.isNull}}</div>
    <div>ObjectValue: {{this.objectDetail.objectValue}}</div>
    <!-- 
ObjectPointer = objPtr,
                clrObject.HexAddress,
                clrObject.Size,
                clrObject.IsArray,
                clrObject.IsBoxed,
                clrObject.,
                =type.BaseType?.Name,
                type.,
                type.,
                TypeName = type.Name,
                 = type.GetValue(objPtr),
                Members = new List<dynamic>(),
                Values = new List<DateTime>(),
    type.-->
    <template>
      <b-table
        hover
        :items="objectDetail.members"
        :fields="fields"
        class="table b-table table-hover table-sm"
      >
        <template slot="value" slot-scope="data">
          <router-link
            v-if="data.item.isObjectReference===true && data.item.elementType!=='String' && data.item.value !== 0 "
            right
            class="nav-item"
            tag="a"
            target="_blank"
            :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:data.item.value }}"
          >{{data.item.value}}</router-link>

          <span
            v-if="data.item.isObjectReference===false ||  data.item.elementType==='String'"
          >{{data.item.value}}</span>
        </template>
      </b-table>
    </template>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  components: { TopBar },
  data: () => {
    return {
      objectDetail: {},
      fields: {
        name: {
          label: "Name"
        },
        offset: {
          label: "Offset",
          sortable: false
        },
        fieldType: {
          label: "Type",
          sortable: false
        },
        address: {
          label: "Address",
          sortable: true
        },
        value: {
          label: "Value",
          sortable: true
        }
      }
    };
  },
  methods: {},
  mounted() {
    apiGateway
      .getObject(this.$route.params.sessionId, this.$route.params.objectPointer)
      .then(response => {
        this.objectDetail = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
