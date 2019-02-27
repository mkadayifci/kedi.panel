

<template>
  <div class="container-fluid pt-80">
    <h5>Object Inspector</h5>
    <hr>
    <h5 v-if="isLoaded">{{this.objectDetail.typeName}} ( {{this.objectDetail.elementType}} )</h5>
    <p/>

    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" href="#profile" role="tab" data-toggle="tab">Object Detail</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">Object References</a>
      </li>
    </ul>
    <div style="padding-top:10px" class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active show" id="profile">
        <h6 v-if="isLoaded">Properties</h6>
        <div v-if="isLoaded" class="card alert alert-secondary">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div>
                  <strong>Size:</strong>
                  {{this.formatNumber(this.objectDetail.size)}}
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

        <div v-if="isLoaded" class="row">
          <div class="col-md-12">
            <div v-if="objectDetail.members.length>0">
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
            </div>
         <div v-if="arrayData.length>0">
              <h6>Array Elements ({{arrayData.length}})</h6>
              <b-table
                hover
                :fields="arrayDataFields"
                :items="arrayData"
                tbody-class="tbodyOuterBeige"
                thead-class="tHead"
                class="table b-table table-hover table-sm"
              >
                <template slot="address" slot-scope="data">
                  <router-link
                    right
                    class="nav-item"
                    tag="a"
                    target="_blank"
                    :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:data.item.address }}"
                  >{{data.item.address}}</router-link>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz">
        <ul style="font-size:1.1em">
          <KediTree :model="referenceData"></KediTree>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import apiGateway from "@/server-communication/api-gateway";
import numberHelper from "@/helpers/number-helper";
import KediTree from "@/components/Common/KediTree.vue";

export default {
  components: { KediTree },
  data: () => {
    return {
      referenceData: [{ children: [] }],
      arrayData: [{ children: [] }],
      isLoaded: false,
      objectDetail: {},
      arrayDataFields: {
        index: {
          label: "Indexer",
          tdClass: "tableMinColWidth",
          formatter: value => {
            return "[" + value + "]";
          }
        },
        address: {
          label: "Address",
          tdClass: "tableMinColWidth"
        },
        value: {
          label: "Value / Content"
        }
      },
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
  methods: {
    formatNumber: function(value) {
      return numberHelper.numberWithCommas(value);
    },
    generateReferenceData: function() {
      let referencedChildren = [];
      let referencedByChildren = [];

      referencedChildren = this.objectDetail.referencedObjects.map(item => {
        return {
          text: `this -> ${item.fieldName} - ${item.address}`,
          address: item.address
        };
      });
      console.log(referencedChildren);
      referencedByChildren = this.objectDetail.referencedByObjects.map(item => {
        return {
          text: `By ${item.relatedType} (${item.baseAddress}) at field "${
            item.fieldName
          }"`,
          address: item.baseAddress
        };
      });

      this.referenceData = {
        text: "Reference Tree",
        nodes: [
          {
            text: `Referenced By (Parent) (${referencedByChildren.length})`,
            nodes: referencedByChildren
          },
          {
            text: `References (Child) (${referencedChildren.length})`,
            nodes: referencedChildren
          }
        ]
      };
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getObject(this.$route.params.sessionId, this.$route.params.objectPointer)
      .then(response => {
        this.objectDetail = response.data;
        this.arrayData = this.objectDetail.arrayElements;
        this.generateReferenceData();
        this.isLoaded = true;
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>
