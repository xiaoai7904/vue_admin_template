<template>
  <div class="user-management">
      <PageTitle :options="pageTitleOptions">
          <Button type="primary" @click="addUser" slot="setting">新增</Button>
          <!-- <Button type="primary" @click="exportUser" slot="setting">导出</Button> -->
      </PageTitle>
      <PageForm ref="pageFormRefs" :options="pageFormOptions"/>
      <PageTable :options="pageTableOptions" @change-table-pagination="changeTablePagination"/>
      <PageModal :options="pageModalOptions" @ok="okPageModal" @cancel="cancelPageModal">
          <PageForm ref="pageModalFormRefs" :options="pageModalFormOptions"/>
      </PageModal>
      <PageResetPassword ref="resetPasswordRef" :userId="currentRow.id" />
  </div>
</template>

<script>
import UserManagement from './UserManagement.class';
export default UserManagement;
</script>

<style lang="less">
</style>