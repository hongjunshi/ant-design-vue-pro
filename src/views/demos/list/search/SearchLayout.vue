<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" style="width: 80%; max-width: 522px;">
          <template v-slot:enterButton>
            搜索
          </template>
        </a-input-search>
      </div>
    </template>
    <route-view/>
  </page-header-wrapper>
</template>

<script>
import { RouteView } from '@hangar/pro-layout';
const getActiveKey = (path) => {
  switch (path) {
    case '/demos/list/search/article':
      return '1';
    case '/demos/list/search/project':
      return '2';
    case '/demos/list/search/application':
      return '3';
    default:
      return '1';
  }
};
export default {
  name: 'SearchLayout',
  components: {
    RouteView
  },
  data() {
    return {
      tabList: [
        { key: '1', tab: '文章' },
        { key: '2', tab: '项目' },
        { key: '3', tab: '应用' }
      ],
      tabActiveKey: '1',
      search: true
    };
  },
  created() {
    this.tabActiveKey = getActiveKey(this.$route.path);

    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path);
    });
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key;
      switch (key) {
        case '1':
          this.$router.push('/demos/list/search/article');
          break;
        case '2':
          this.$router.push('/demos/list/search/project');
          break;
        case '3':
          this.$router.push('/demos/list/search/application');
          break;
        default:
          this.$router.push('/demos/dashboard/workplace');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>
