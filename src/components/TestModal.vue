<template>
  <el-dialog
    title="編集"
    :visible.sync="$props.dialogVisible"
    :before-close="hideModal"
  >
    {{ val }}
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="update">更新</el-button>
      <el-button type="info" @click="hideModal">モーダル閉じる</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    val: Object
  },
  methods: {
    update() {
      this.val.name = "名前変えてみた";
      this.$emit("updateCurrency", this.val);
    },
    hideModal() {
      this.$emit("onModal");
    }
  }
};
</script>
