<template>
  <el-dialog
    title="編集"
    :visible.sync="$props.materialUpdateModalVisible"
    :before-close="hideModal"
  >
    <el-col :span="24">
      <el-card class="box-card box-card-wrapper">
        <div slot="header">
          <span>材料更新</span>
        </div>
        <el-form ref="request" :model="request" :rules="rules">
          <el-row class="row-wrapper r-id">
            <el-col :span="12">
              <span>ID</span>
            </el-col>
            <el-col :span="12">
              <span>{{ request.id }}</span>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>材料名</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name">
                <el-input
                  v-model="request.name"
                  placeholder="材料名..."
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>タグ1</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tag1">
                <el-input
                  v-model="request.tag1"
                  placeholder="タグ1..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>タグ2</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tag2">
                <el-input
                  v-model="request.tag2"
                  placeholder="タグ2..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>タグ3</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tag3">
                <el-input
                  v-model="request.tag3"
                  placeholder="タグ3..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>メーカー名</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="makerName">
                <el-input
                  v-model="request.makerName"
                  placeholder="メーカー名..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>メーカー担当者</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="makerCharge">
                <el-input
                  v-model="request.makerCharge"
                  placeholder="メーカー担当者..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>メーカー連絡先</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="makerContact">
                <el-input
                  v-model="request.makerContact"
                  placeholder="メーカー連絡先..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="12">
              <span>備考</span>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="makerContact">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model="request.remarks"
                  placeholder="備考..."
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="update">更新</el-button>
      <el-button size="medium" type="info" @click="hideModal">閉じる</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      request: {
        name: undefined,
        tag1: undefined,
        tag2: undefined,
        tag3: undefined,
        makerName: undefined,
        makerCharge: undefined,
        makerContact: undefined,
        remarks: undefined
      },
      rules: {
        name: [
          { required: true, message: "材料名は必須です。", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "3~5文字で入力してください",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    materialUpdateModalVisible: Boolean,
    materialUpdateRequest: Object
  },
  methods: {
    update() {
      this.$emit("updateMaterial", this.request);
    },
    hideModal() {
      this.$emit("onMaterialUpdateModal");
    }
  },
  watch: {
    // 表示時にオブジェクトをコピーしておく
    materialUpdateModalVisible: function(after, before) {
      if (!before && after) {
        this.request = Object.assign({}, this.materialUpdateRequest);
      }
    }
  }
};
</script>
