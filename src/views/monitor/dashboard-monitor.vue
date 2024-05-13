<template>
  <div class="dashboard-editor-container">
    <show-map></show-map>
    <panel-group />
  </div>
</template>

<script>
import PanelGroup from './components/panel-group'
import ShowMap from './components/show-map'


export default {
  name: 'DashboardMonitor',
  components: {
    ShowMap,
    PanelGroup
  },

}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 10px;
  height:100%;
  width:100%;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
