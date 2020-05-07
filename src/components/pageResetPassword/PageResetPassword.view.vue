<template>
    <PageModal :options="pageModalOptions" @ok="okPageModal" @cancel="cancelPageModal" v-if="pageModalOptions.show">
        <PageForm ref="pageModalFormRefs" :options="pageModalFormOptions" />
    </PageModal>
</template>

<script>
import PageResetPassword from './PageResetPassword.class';
export default PageResetPassword;
</script>