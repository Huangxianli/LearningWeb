<template>
  <div class="home-view">
    <section :class="['home-view-nav', navIsHidden ? 'home-view-nav-hidden' : '']">
      <div class="home-view-nav-title">生产管理系统</div>
      <div class="home-view-nav-menu">
        <el-menu mode="vertical" :collapse="false" background-color="#001529" text-color="#ffffffa5"
          :default-openeds="defaultOpeneds" active-text-color="#ffffff" @select="selectMenuItem" router>
          <el-submenu v-for="(item, index) in navList" :key="item.key" :index="`${index}`">
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>

            <template v-if="Array.isArray(item.children) && item.children.length">
              <el-menu-item v-for="(childrenItem, childrenIndex) in item.children" :key="childrenItem.key"
                :index="`${index}-${childrenIndex}`" :route="`/${childrenItem.key}`">
                <span>{{ childrenItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </div>
    </section>
    <section class="home-view-right">
      <div class="home-view-right-head">
        <i :class="['home-view-nav-hidden-icon', navIsHidden ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
          @click="clickIcon"></i>
      </div>
      <section :class="['home-view-main', navIsHidden ? 'home-view-nav-hidden-main' : '']">
        <router-view name="right-content">
        </router-view>
      </section>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      navIsHidden: true,
      navList: [
        {
          key: 'dataDashboard',
          name: '数据看板',
          children: [
            {
              key: 'departmentDashboard',
              name: '部门看板',
            },
            {
              key: 'personalDashboard',
              name: '个人看板',
            },
          ],
        },
        {
          key: 'projectManagement',
          name: '项目管理',
          children: [
            {
              key: 'projectList',
              name: '项目列表',
            },
            {
              key: 'myTasks',
              name: '我的任务',
            },
            {
              key: 'unassignedTasks',
              name: '待分配任务',
            },
          ],
        },
        {
          key: 'configurationManagement',
          name: '配置管理',
          children: [
            {
              key: 'projectTemplates',
              name: '项目模板',
            },
            {
              key: 'taskTypes',
              name: '任务类型',
            },
          ],
        },
        {
          key: 'personnelManagement',
          name: '人员管理',
          children: [
            {
              key: 'basicInformation',
              name: '基本信息',
            },
            {
              key: 'personnelCalendar',
              name: '人员日历',
            },
            {
              key: 'workHourStatistics',
              name: '工时统计',
            },
          ],
        },
      ],
    }
  },
  computed: {
    defaultOpeneds () {
      return this.navList.map((item, index) => String(index));
    }

  },
  methods: {
    selectMenuItem (index, indexPath) {
      index;
      indexPath;
    },
    clickIcon () {
      this.navIsHidden = !this.navIsHidden;
    },
  },

}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}

.home-view-nav {
  flex-shrink: 0;
  height: 100vh;
  width: 256px;
  background-color: #001529;
  overflow: auto;
}

.home-view-nav-hidden {
  width: 0px;
}

.home-view-nav-title {
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  font-weight: 700;
  background: #00284d;
  color: #fffbfb;
  text-align: center;
}

.home-view-nav-menu {
  height: calc(100vh - 65px);
  overflow: auto;
}

.home-view-right {}

.home-view-right-head {
  height: 64px;
  width: 100%;
  background-color: #ffffff;
  margin-left: 20px;
}

.home-view-nav-hidden-icon {
  font-size: 24px;
  line-height: 64px;
  color: #606060;
}

.home-view-main {
  background: #f0f2f5;
  padding: 12px 20px;
  height: calc(100vh - 88px);
  width: calc(100vw - 296px);
  overflow: auto;
}

.home-view-nav-hidden-main {
  width: calc(100vw - 40px)
}
</style>