<template>
  <el-button size="mini" type="primary" @click="showModal">編集</el-button>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$emit("onModal");
    }
  }
};
</script>
