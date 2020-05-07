<template>
  <div class="system-log-management">
      <PageTitle :options="pageTitleOptions">
          <!-- <Button type="primary" @click="addUser" slot="setting">新增</Button> -->
      </PageTitle>
      <PageForm ref="pageFormRefs" :options="pageFormOptions"/>
      <PageTable :options="pageTableOptions" tooltip />
     <!-- <PageModal :options="pageModalOptions" @ok="okPageModal" @cancel="cancelPageModal">
          <PageForm ref="pageModalFormRefs" :options="pageModalFormOptions"/>
      </PageModal>-->
  </div>
</template>

<script>
import SystemLogManagement from './SystemLogManagement.class';
export default SystemLogManagement;
</script>

<style lang="less">
</style>