<template>
  <div class="role-management">
    <PageTitle :options="pageTitleOptions">
      <Button v-show="currnetPage === 1" type="primary" @click="add" slot="setting">新增</Button>
      <Button v-show="currnetPage === 2" type="success" @click="back" slot="setting">返回上一级</Button>
    </PageTitle>
    <div v-show="currnetPage === 1" class="role-management-page1">
      <PageTable :options="pageTableOptions" />
    </div>
    <div v-if="currnetPage === 2" class="role-management-page2">
      <PageForm ref="pageFormRefs" :options="pageFormOptions" />
    </div>
  </div>
</template>
<script>
import RoleManagement from './RoleManagement.class';
export default RoleManagement;
</script>

<style lang="less">
.role-management {
  &-page2 {
    padding: 20px;
    height: calc(100vh - 125px);
    overflow-y: auto;
  }
  &-bts {
    .ivu-btn-primary {
      margin-right: 10px;
    }
  }
}
</style>