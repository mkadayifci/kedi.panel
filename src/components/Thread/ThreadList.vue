<template>
  <div>
    <b-table ref="resultTable" :per-page="pageSize" hover small :items="items" :fields="fields">
      <template slot="show_details" slot-scope="row">
        <i
          @click.stop="tableRowDetailToggle(row)"
          class="tableIcon fa"
          v-bind:class=" row.detailsShowing ? 'fa-minus-square' : 'fa-plus-square'"
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
import axios from "axios";

export default {
  name: "ThreadList",
  components: { StackTrace, StackObjects },
  props: {},
  data: function() {
    return {
      server_url: "http://localhost:9000/api",
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
          formatter: (value, key, item) => {
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
          formatter: (value, key, item) => {
            return timeHelper.msToTime(value);
          }
        },
        kernelTimeMiliseconds: {
          label: "Kernel Time",
          sortable: true,
          formatter: (value, key, item) => {
            return timeHelper.msToTime(value);
          }
        }
      }
    };
  },
  methods: {
    tableRowDetailToggle: function(row) {
      if (!row.detailsShowing) {
      }
      row.toggleDetails();
    },
    list: function() {
      return axios
        .get(this.server_url + "/threads/30230bf96a884830a0b96805cf173717")
        .then(response => {
          this.items = this.prepareThreadDataForPresantation(response.data);
          this.$refs.resultTable.refresh();
        })
        .catch(error => {
          console.log(error);
          this.items = [];
        });
    },
    prepareThreadDataForPresantation(threadData) {
      threadData.forEach(item => {
        item._showDetails = true;
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

<style >
.tableIcon {
  font-size: 18px;
  cursor: pointer;
  color: gray;
}

.tableDetailColumn {
  width: 1px !important;
}
</style>
