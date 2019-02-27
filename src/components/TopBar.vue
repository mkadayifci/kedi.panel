<template>
  <div>
    <nav style="z-index:999" class="navbar fixed-top navbar-light bg-light navBarCustom">
      <div>
      <a class="navbar-brand navBrandCustom" href="#">
        <img class="logo" :src="require('@/assets/images/logo-mini.png')">
        <span class="logoTitle">kedi</span>
      </a>
        <span v-if="currentFileName" class="activeFileLabel">({{currentFileName}})</span>
        </div>
      <div class="form-inline my-2 my-lg-0">
        <b-link style="padding-right:20px;color:black" @click="showFeedback">Send Feedback</b-link>
        <button
          v-if="$route.name!=='open-file'"
          type="button"
          @click="closeActiveSession"
          class="btn btn-dark btn-sm"
        >Open Dump File</button>
      </div>
    </nav>
    <b-modal ref="feedbackModal" centered hide-footer id="modal1" title="Feedback for kedi!!!">
      <p
        v-if="!feedbackSent"
      >Please give us your feedback. We work hard for developing kedi and need your opinions for this.</p>
      <b-container v-if="!feedbackSent" fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="nameInput">Name</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="feedbackName" size="sm" id="nameInput" type="text"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="emailInput">E-mail</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="feedbackMail" size="sm" id="emailInput" type="email"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="contentInput">Feedback (required)</label>
          </b-col>
          <b-col sm="9">
            <b-form-textarea id="contentInput" v-model="feedbackContent" rows="3"/>
          </b-col>
        </b-row>
        <b-button class="mt-3" variant="outline-success" block @click="sendFeedback">Send</b-button>
      </b-container>
      <div v-if="feedbackSent" style="line-height:120px;padding-left:30px">
        <i
          style="font-size: 100px;color: green;line-height: normal;vertical-align: middle;"
          class="fa fa-check-square-o"
          aria-hidden="true"
        ></i>
        <span
          style="font-size: 24px; line-height: normal;vertical-align: middle;"
        >We received your feedback!</span>
      </div>
    </b-modal>
  </div>
</template>
<script>
import apiGateway from "@/server-communication/api-gateway";
import validateHelper from "@/helpers/validate-helper";

export default {
  //#a6c!important
  name: "top-bar",
  data: function() {
    return {
      feedbackName: "",
      feedbackMail: "",
      feedbackContent: "",
      feedbackSent: false
    };
  },
  components: {},
  computed: {
    currentFileName: function() {
      let currentSession = this.$store.getters.currentSession;
      if (currentSession) {
        return currentSession.filePath.split("\\").pop();
      }
      return null;
    }
  },
  watch: {},
  methods: {
    showFeedback: function() {
      this.$refs.feedbackModal.show();
    },
    sendFeedback: function() {
      if (!validateHelper.validateEmail(this.feedbackMail)) {
        this.feedbackMail = "";
      }

      if (!this.feedbackContent) {
        this.$errNotifier("Input Error", "Feedback content is empty");
        return;
      }

      this.$loadingIndicatorHelper.showProgress(this);

      apiGateway
        .commitFeedback(
          this.feedbackName,
          this.feedbackMail,
          this.feedbackContent
        )
        .then(response => {
          console.log("Feedback giti");
          this.feedbackName = "";
          this.feedbackMail = "";
          this.feedbackContent = "";
          this.feedbackSent = true;
          this.$loadingIndicatorHelper.hideProgress(this);

          let self = this;
          setTimeout(() => {
            self.$refs.feedbackModal.hide();
            self.feedbackSent = false;
          }, 5000);
        })
        .catch(error => {
          this.$loadingIndicatorHelper.hideProgress(this);
        });
    },
    closeActiveSession: function() {
      this.$router.push({ name: "open-file" });
    }
  }
};
</script>
<style scoped>
.navBarCustom {
  box-shadow: 0px 0px 1px black;
  -moz-box-shadow: 0px 0px 1px black;
  -webkit-box-shadow: 0px 0px 1px black;
  background-color: #d19b3d !important;
}
.navBrandCustom {
  padding-left: 15px;
}
.logo {
  width: 32px;
}
.logoTitle {
  padding-left: 5px;
}

.activeFileLabel {
  font-size: 0.8rem !important;
}
</style>

