<template>
  <div class="nav-side-menu">
    <div class="brand brand-kedi">
      <img :src="require('@/assets/images/logo-mini.png')">
      kedi.io
    </div>
    <div class="menu-list">
      <ul id="menu-content" class="menu-content collapse out">
        <router-link right class="nav-item" tag="li" to="/summary">
          <i class="fa fa-file-text fa-lg"></i> Summary
        </router-link>
        <router-link right class="nav-item" tag="li" to="/modules">
          <i class="fa fa-cubes fa-lg"></i> Modules
        </router-link>
        <router-link right class="nav-item" tag="li" to="/threads">
          <i class="fa fa-cogs fa-lg"></i> Threads
        </router-link>

        <li data-toggle="collapse" data-target="#products" class="collapsed active">
          <a href="#">
            <i class="fa fa-gift fa-lg"></i> UI Elements
            <span class="arrow"></span>
          </a>
        </li>
        <ul class="sub-menu collapse" id="products">
          <li class="active">
            <a href="#">CSS3 Animation</a>
          </li>
          <li>
            <a href="#">General</a>
          </li>
          <li>
            <a href="#">Buttons</a>
          </li>
          <li>
            <a href="#">Tabs &amp; Accordions</a>
          </li>
          <li>
            <a href="#">Typography</a>
          </li>
          <li>
            <a href="#">FontAwesome</a>
          </li>
          <li>
            <a href="#">Slider</a>
          </li>
          <li>
            <a href="#">Panels</a>
          </li>
          <li>
            <a href="#">Widgets</a>
          </li>
          <li>
            <a href="#">Bootstrap Model</a>
          </li>
        </ul>
        <li data-toggle="collapse" data-target="#service" class="collapsed">
          <a href="#">
            <i class="fa fa-globe fa-lg"></i> Services
            <span class="arrow"></span>
          </a>
        </li>
        <ul class="sub-menu collapse" id="service">
          <li>New Service 1</li>
          <li>New Service 2</li>
          <li>New Service 3</li>
        </ul>

        <li data-toggle="collapse" data-target="#new" class="collapsed">
          <a href="#">
            <i class="fa fa-car fa-lg"></i> New
            <span class="arrow"></span>
          </a>
        </li>
        <ul class="sub-menu collapse" id="new">
          <li>New New 1</li>
          <li>New New 2</li>
          <li>New New 3</li>
        </ul>
        <li>
          <a href="#">
            <i class="fa fa-user fa-lg"></i> Profile
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-users fa-lg"></i> Users
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<style>
.nav-side-menu {
  overflow: auto;
  font-size: 14px;
  background-color: #0079a5;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 300px;
  height: 100%;
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
  margin-left: 10px;
  border-radius: 5px 0px 0px 5px;
  line-height: 35px;
  cursor: pointer;
  /*    
    .collapsed{
       .arrow:before{
                 font-family: FontAwesome;
                 content: "\f053";
                 display: inline-block;
                 padding-left:10px;
                 padding-right: 10px;
                 vertical-align: middle;
                 float:right;
            }
     }
*/
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
  border-left: 3px solid #d19b3d;
  background-color: #374955;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #181c20;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #0079a5;
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
  padding-left: 30px;
  border-left: 3px solid #0079a5;
  border-bottom: 1px solid #0079a5;
}
.nav-side-menu li a {
  text-decoration: none;
  color: #ffffff;
}
.nav-side-menu li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 30px;
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
