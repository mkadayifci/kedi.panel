<template>
  <div class="nav-side-menu col-md-12">
    <div class="menu-list">
      <ul id="menu-content" class="menu-content collapse out">
        <router-link
          right
          class="nav-item"
          tag="li"
          :to="{ name: 'summary', params: {sessionId:this.$route.params.sessionId }}"
        >
          <i class="fa fa-file-text fa-lg"></i> Summary
        </router-link>
        <router-link
          right
          class="nav-item"
          tag="li"
          :to="{ name: 'modules', params: {sessionId:this.$route.params.sessionId }}"
        >
          <i class="fa fa-cubes fa-lg"></i> Modules
        </router-link>
        <router-link
          right
          class="nav-item"
          tag="li"
          :to="{ name: 'threads', params: {sessionId:this.$route.params.sessionId }}"
        >
          <i class="fa fa-cogs fa-lg"></i> Threads
        </router-link>
        <router-link
          right
          class="nav-item"
          tag="li"
          :to="{ name: 'memory', params: {sessionId:this.$route.params.sessionId }}"
        >
          <i class="fa fa-microchip fa-lg"></i> Memory Stats
        </router-link>
        <li data-toggle="collapse" data-target="#products" class="collapsed active">
          <a href="#">
            <i class="fa fa-paw fa-lg"></i> Analyzers
            <span class="arrow"></span>
          </a>
        </li>
        <ul style="padding-left:35px" class="sub-menu collapse show" id="products">
          <router-link
            tag="li"
            :to="{ name: 'exception-analyzer', params: {sessionId:this.$route.params.sessionId }}"
          >Exception</router-link>
          <router-link
            tag="li"
            :to="{ name: 'stack-trace-analyzer', params: {sessionId:this.$route.params.sessionId }}"
          >Call Stack</router-link>
          <router-link
            tag="li"
            :to="{ name: 'threadpool-analyzer', params: {sessionId:this.$route.params.sessionId }}"
          >ThreadPool</router-link>
          <router-link
            tag="li"
            :to="{ name: 'duplicate-strings-analyzer', params: {sessionId:this.$route.params.sessionId }}"
          >Duplicate Strings</router-link>
          <router-link
            tag="li"
            :to="{ name: 'large-objects-analyzer', params: {sessionId:this.$route.params.sessionId }}"
          >Large Objects</router-link>

          <!-- <li>
            <a href="#">ADO.Net Best Practices</a>
          </li>
          <li>
            <a href="#">Http Best Practices</a>
          </li>-->
        </ul>
        <router-link
          style="display:none"
          right
          class="nav-item"
          tag="li"
          :to="{ name: 'terminal', params: {sessionId:this.$route.params.sessionId }}"
        >
          <i class="fa fa-terminal fa-lg"></i> Terminal Session
        </router-link>
      </ul>
    </div>
    <div class="fixed-bottom" style="padding-left: 34px;padding-bottom:5px;font-size:0.75rem">
      <div class="row">
        <span>website :&nbsp;&nbsp;</span>
        <a style="color:gray" target="_blank" href="https://www.kedi-analyzer.com">kedi-analyzer.com</a>
      </div>
      <div class="row">
        <span>e-mail :&nbsp;&nbsp;</span>
        <a style="color:gray" href="mailto:mehmet@kadayifci.ch">mehmet@kadayifci.ch</a>
      </div>
    </div>
  </div>
</template>

<style>
.nav-side-menu {
  position: sticky;
  overflow: auto;
  font-size: 14px;
  background-color: #181818;
  top: 60px;
  left: 0px;
  padding-right: 0px;
  color: #ffffff;
}
.nav-side-menu .brand {
  background-color: #374955;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 14px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin-left: 3px;
  border-radius: 5px 0px 0px 5px;
  line-height: 35px;
  cursor: pointer;
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";

  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  float: right;
}
.nav-side-menu ul .router-link-active,
.nav-side-menu li .router-link-active {
  border-left: 3px solid #d19b3d !important;
  background-color: #d19b3d !important;
  color: black;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d !important;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d !important;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #181818;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #181818;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.nav-side-menu li {
  padding-left: 3px;
  border-left: 3px solid #181818;
  border-bottom: 1px solid #181818;
}
.nav-side-menu li a {
  text-decoration: none;
  color: #ffffff;
}
.nav-side-menu li a i {
  /* padding-left: 10px;
  width: 20px;
  padding-right: 30px; */
}

.nav-side-menu li i {
  width: 32px;
  text-align: center;
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #374955;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
@media (max-width: 767px) {
  .nav-side-menu {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }
  .nav-side-menu .toggle-btn {
    display: block;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10 !important;
    padding: 3px;
    background-color: #ffffff;
    color: #000;
    width: 40px;
    text-align: center;
  }
  .brand {
    text-align: left !important;
    font-size: 22px;
    padding-left: 20px;
    line-height: 50px !important;
  }
}
@media (min-width: 767px) {
  .nav-side-menu .menu-list .menu-content {
    padding-top: 10px;
    display: block;
  }
  #main {
    width: calc(100% - 300px);
    float: right;
  }
}

body {
  margin: 0px;
  padding: 0px;
}

.brand-kedi {
  text-align: left !important;
  font-size: 24px !important;
  padding: 5px 10px !important;
  -webkit-box-shadow: 0px 0px 1px black;
  -moz-box-shadow: 0px 0px 1px black;
  box-shadow: 0px 0px 1px black;
  border-radius: 0px 0px 5px 5px;
}
</style>
