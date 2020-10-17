<template>
  <el-dialog
    title="参照"
    :visible.sync="$props.materialDetailModalVisible"
    :before-close="hideModal"
  >
    <el-col :span="24">
      <el-card class="box-card box-card-wrapper">
        <div slot="header">
          <span>材料参照</span>
        </div>
        <el-row class="row-wrapper r-id">
          <el-col :span="12">
            <span>ID</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.id }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>材料名</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.name }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>タグ1</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.tag1 }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>タグ2</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.tag2 }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>タグ3</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.tag3 }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>メーカー名</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.makerName }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>メーカー担当者</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.makerCharge }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>メーカー連絡先</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.makerContact }}</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>備考</span>
          </el-col>
          <el-col :span="12">
            <span>{{ materialDetailRequest.remarks }}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="info" @click="hideModal">閉じる</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    materialDetailModalVisible: Boolean,
    materialDetailRequest: Object
  },
  methods: {
    hideModal() {
      this.$emit("hideMaterialDetailModal");
    }
  }
};
</script>
