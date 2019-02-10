

<template>
  <div class="container-fluid pt-80">
    <h5>Object Inspector</h5>
    <hr>
    <TopBar/>
    <h5 v-if="isLoaded">{{this.objectDetail.typeName}} ( {{this.objectDetail.elementType}} )</h5>
    <p/>
    <h6  v-if="isLoaded">Properties</h6>
    <div  v-if="isLoaded" class="card alert alert-secondary">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div>
              <strong>Size:</strong>
              {{this.objectDetail.size}}
            </div>
            <div>
              <strong>TypeName:</strong>
              {{this.objectDetail.typeName}}
            </div>
            <div>
              <strong>BaseTypeName:</strong>
              {{this.objectDetail.baseTypeName}}
            </div>
            <div>
              <strong>Address:</strong>
              {{this.objectDetail.objectPointer}}
            </div>
            <div>
              <strong>HexAddress:</strong>
              {{this.objectDetail.hexAddress}}
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <strong>MethodTable:</strong>
              {{this.objectDetail.methodTable}}
            </div>
            <div>
              <strong>IsArray:</strong>
              {{this.objectDetail.isArray}}
            </div>
            <div>
              <strong>IsBoxed:</strong>
              {{this.objectDetail.isBoxed}}
            </div>
            <div>
              <strong>IsNull:</strong>
              {{this.objectDetail.isNull}}
            </div>
          </div>
        </div>
        <p/>
        <div class="row">
          <div class="col-md-12">
            <div>
              <strong>Module:</strong>
              {{this.objectDetail.module}}
            </div>
            <div>
              <strong>ObjectValue:</strong>
              {{this.objectDetail.objectValue}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div  v-if="isLoaded" class="row">
      <div class="col-md-12">
        <template>
          <h6>Members</h6>
          <b-table
            hover
            :items="objectDetail.members"
            :fields="fields"
            tbody-class="tbodyOuterBeige"
            thead-class="tHead"
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
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  components: { TopBar },
  data: () => {
    return {
      isLoaded: false,
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
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getObject(this.$route.params.sessionId, this.$route.params.objectPointer)
      .then(response => {
        this.objectDetail = response.data;
        this.isLoaded = true;
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>
