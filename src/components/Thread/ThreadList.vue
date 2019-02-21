<template>
  <div>
    <b-table
      ref="resultTable"
      :per-page="pageSize"
      hover
      small
      :items="items"
      :fields="fields"
      tbody-class="tbodyOuterBeige"
      thead-class="tHead"
    >
      <template slot="show_details" slot-scope="row">
        <i
          @click.stop="tableRowDetailToggle(row)"
          class="tableIcon fa"
          v-bind:class="
          row.detailsShowing ? 'fa-minus-square' : 'fa-plus-square'
          "
        ></i>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card style="background-color:whitesmoke;">
          <StackTrace :items="row.item.stackTrace"/>
        </b-card>
        <b-card style="background-color:whitesmoke;">
          <StackObjects :items="row.item.stackObjects"/>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import StackTrace from "@/components/Thread/StackTrace.vue";
import StackObjects from "@/components/Thread/StackObjects.vue";
import timeHelper from "@/helpers/time-helper";
import numberHelper from "@/helpers/number-helper";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "ThreadList",
  event: "on-loaded",
  components: { StackTrace, StackObjects },
  props: {},
  data: function() {
    return {
      activeCallCount: 0,
      pageSize: 100,
      isTableBusy: false,
      items: Array,
      fields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        osThreadId: {
          label: "Os Id",
          sortable: true,
          formatter: value => {
            return numberHelper.decimalToHexString(value);
          }
        },
        managedThreadId: {
          label: "Managed Id",
          sortable: true
        },
        gcMode: {
          label: "GC Mode",
          sortable: true
        },

        userTimeMiliseconds: {
          label: "User Time",
          sortable: true,
          formatter: value => {
            return timeHelper.msToTime(value);
          }
        },
        kernelTimeMiliseconds: {
          label: "Kernel Time",
          sortable: true,
          formatter: value => {
            return timeHelper.msToTime(value);
          }
        },
        lockCount: {
          label: "Locks",
          sortable: true
        },
        isAlive: {
          label: "Alive",
          sortable: true
        },
        isBackground: {
          label: "Background",
          sortable: true
        },
        threadingModel: {
          label: "Model",
          sortable: true
        },
        specialRole: {
          label: "Special Role",
          sortable: true
        },
        currentExceptionType: {
          label: "Exception",
          sortable: true
        }
      }
    };
  },
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    list: function() {
      apiGateway
        .getThreadsList(this.$route.params.sessionId)
        .then(response => {
          this.items = this.prepareThreadDataForPresantation(response.data);
          this.$refs.resultTable.refresh();
          this.$emit("on-loaded", this);
        })
        .catch(error => {
          this.items = [];
          this.$emit("on-loaded", this);
        });

    },
    prepareThreadDataForPresantation(threadData) {
      threadData.forEach(item => {
        item._showDetails = false;
        for (let i = 0; i < item.stackTrace.length; i++) {
          item.stackTrace[i].displayString =
            new String(" ").repeat((i + 1) * 1) +
            item.stackTrace[i].displayString;
        }
      });
      return threadData;
    }
  }
};
</script>

<style>

</style>
