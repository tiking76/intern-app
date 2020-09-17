<template>
  <div id="app">
    <div class="subject">Crypto Currencies</div>
    <el-input placeholder="Search Coin" v-model="input" class="serch"></el-input>
    <div class="cointable">
      <el-collapse
        v-model="activeNameList.id"
        accordion
        v-for="(activeName, index) in filteredActiveNameList"
        v-bind:key="activeName.id"
      >
        <el-collapse-item>
          <template slot="title">
            {{activeName.name}}
            <div class="price">
              <div v-bind:class="[index >= 0 ? (String(activeName.id)) : 'non']" ></div>
            </div>
          </template>
          <template slot="index">{{index}}</template>
          <span v-html="activeName.description" />
          <template v-if="activeName.description == null">
            <p class="nodata">Sorry! No Data</p>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
export default {
  name: "App",
  data() {
    return {
      activeNameList: [],
      index: 0,
      input: "",
    };
  },
  created: function () {
    this.getDatas();
  },
  mounted: function () {
    this.getDatas();
  },
  computed: {
    filteredActiveNameList: function () {
      return this.activeNameList.filter((x) => {
        return x.name.toLowerCase().startsWith(this.input.toLowerCase());
      });
    },
  },
  methods: {
    getDatas: function () {
      $.get("/coins-info", {}, (data, err) => {
        this.activeNameList = Object.values(data);
      });
    },
  },
};
</script>

<style scoped>
#app {
  font-style: oblique;
}
.subject {
  font-size: 4rem;
  font-weight: 700;
  display: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.price {
  font-style: oblique;
  font-size: 1rem;
  right: 15%;
  position: absolute;
}
.nodata {
  font-style: oblique;
  font-size: 2rem;
}
.cointable {
  box-shadow: 3px 3px 6px -2px #555, 3px 3px 8px rgba(255, 255, 255, 0.8) inset;
  padding-top: 20px;
}
.serch {
  box-shadow: 3px 3px 6px -2px #555, 3px 3px 8px rgba(255, 255, 255, 0.8) inset;
}
</style>
