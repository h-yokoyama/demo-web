<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>実験計画作成</span>
        </div>
        <el-card class="box-card">
          <el-form ref="request" :model="request" :rules="rules">
            <div slot="header">
              <span>あああ</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >Operation button</el-button
              >
            </div>
            <div class="input-wrapper">
              <div class="text item input-innner_left">
                <span>実験名</span>
              </div>
              <div class="text item input-innner_right">
                <el-form-item prop="name">
                  <el-input
                    placeholder="実験名..."
                    v-model="request.name"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="input-wrapper">
              <div class="text item input-innner_left">
                <span>実験期間</span>
              </div>
              <div class="text item input-innner_right">
                <el-form-item prop="date">
                  <el-date-picker
                    v-model="request.date"
                    type="daterange"
                    range-separator="～"
                    start-placeholder="開始日"
                    end-placeholder="終了日"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>

            <div class="input-wrapper">
              <div class="text item input-innner_left">
                <span>実験者</span>
              </div>
              <div
                class="text item input-innner_right"
                v-text="request.email"
              ></div>
            </div>

            <div class="input-wrapper">
              <div class="text item input-innner_left textarea">
                <span>課題</span>
              </div>
              <div class="text item input-innner_right">
                <el-form-item prop="task">
                  <el-input
                    type="textarea"
                    placeholder="課題..."
                    v-model="request.task"
                    :rows="7"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="input-wrapper">
              <div class="text item input-innner_left textarea">
                <span>狙い</span>
              </div>
              <div class="text item input-innner_right">
                <el-form-item prop="provisional">
                  <el-input
                    type="textarea"
                    placeholder="狙い..."
                    v-model="request.provisional"
                    :rows="7"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="input-wrapper">
              <div class="text item input-innner_left textarea">
                <span>検討結果</span>
              </div>
              <div class="text item input-innner_right">
                <el-form-item prop="result">
                  <el-input
                    type="textarea"
                    placeholder="検討結果..."
                    v-model="request.result"
                    :rows="7"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-card>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//import MixMate from "@/mixin/Http.js";
import firebase from "firebase";
//import url from "@/mixin/UrlMixin.js";

export default {
  name: "NewPlan",
  components: {},
  created() {
    let user = firebase.auth().currentUser;
    this.request.email = user.email;
  },
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
        remarks: undefined,
        date: undefined,
        email: undefined,
        task: undefined,
        provisional: undefined,
        retuslt: undefined
      },
      rules: {
        name: [
          { required: true, message: "実験名は必須です。", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "3~5文字で入力してください",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ebeef5;

  .input-innner_left {
    width: 10%;
    height: 62px;
    border-right: 1px solid #ebeef5;
    color: #909399;
    font-weight: bold;
    font-size: 14px;
    background-color: #f5f7fa;
    line-height: 4.4;
  }
  .textarea {
    height: 181px;
    font-family: inherit;
  }
  .input-innner_right {
    width: 90%;
    text-align: left;
  }
}
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
</style>
