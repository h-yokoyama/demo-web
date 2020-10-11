<template>
  <el-button size="mini" type="primary" @click="showMaterialUpdateModal"
    >更新</el-button
  >
</template>

<script>
export default {
  methods: {
    showMaterialUpdateModal() {
      this.$emit("onMaterialUpdateModal");
    }
  }
};
</script>
