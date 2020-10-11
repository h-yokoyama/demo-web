<template>
  <el-button size="mini" type="primary" @click="showMaterialAddModal"
    >新規</el-button
  >
</template>

<script>
export default {
  methods: {
    showMaterialAddModal() {
      this.$emit("onMaterialAddModal");
    }
  }
};
</script>
