<template>
  <el-button size="medium" type="success" @click="showMaterialAddModal"
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
