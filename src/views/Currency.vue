<template>
  <el-row>
    <el-col :span="24">
      <div slot="header">
        <span>新規材料追加</span>
      </div>
      <el-card class="box-card box-card-wrapper">
        <material-add-list v-on:onMaterialAddModal="onMaterialAddModal(true)" />
        <material-add-modal
          v-bind:materialAddModalVisible="materialAddModalVisible"
          v-on:onMaterialAddModal="onMaterialAddModal(false)"
          v-on:saveMaterial="saveMaterial"
        />
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>材料一覧</span>
        </div>
        <material-detail-modal
          v-bind:materialDetailModalVisible="materialDetailModalVisible"
          v-bind:materialDetailRequest="materialDetailRequest"
          v-on:onMaterialDetailModal="onMaterialDetailModal(false)"
          v-on:hideMaterialDetailModal="hideMaterialDetailModal"
        />
        <el-table :data="materials" style="width: 100%" @row-click="rowClick">
          <el-table-column label="材料情報">
            <el-table-column prop="id" label="材料ID" width="100" />
            <el-table-column prop="name" label="材料名" width="200" />
            <el-table-column prop="tag1" label="タグ1" width="200" />
            <el-table-column prop="tag1" label="タグ2" width="200" />
            <el-table-column prop="tag1" label="タグ3" width="200" />
          </el-table-column>
          <el-table-column label="メーカー情報">
            <el-table-column prop="makerName" label="メーカー名" width="200" />
            <el-table-column
              prop="makerCharge"
              label="メーカー担当者"
              width="200"
            />
            <el-table-column
              prop="makerContact"
              label="メーカー連絡先"
              width="200"
            />
          </el-table-column>
          <el-table-column
            prop="operation"
            label="Ops"
            width="200"
            align="left"
          >
            <template slot-scope="scope">
              <material-update-list
                v-on:onMaterialUpdateModal="
                  onMaterialUpdateModal(true, scope.row)
                "
              />
              <material-update-modal
                v-bind:materialUpdateModalVisible="materialUpdateModalVisible"
                v-bind:materialUpdateRequest="materialUpdateRequest"
                v-on:onMaterialUpdateModal="
                  onMaterialUpdateModal(false, materialUpdateRequest)
                "
                v-on:updateMaterial="updateMaterial"
              />
              <el-button
                size="mini"
                type="danger"
                @click="deleteMaterial(scope.row.id)"
                >×</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import MaterialDetailModal from "@/components/material/MaterialDetailModal.vue";
import MaterialUpdateList from "@/components/material/MaterialUpdateList.vue";
import MaterialUpdateModal from "@/components/material/MaterialUpdateModal.vue";
import MaterialAddList from "@/components/material/MaterialAddList.vue";
import MaterialAddModal from "@/components/material/MaterialAddModal.vue";
import url from "@/mixin/UrlMixin.js";

export default {
  name: "Currency",
  components: {
    MaterialDetailModal,
    MaterialUpdateList,
    MaterialUpdateModal,
    MaterialAddList,
    MaterialAddModal
  },

  data() {
    return {
      materials: [],
      materialDetailModalVisible: false,
      materialAddModalVisible: false,
      materialUpdateModalVisible: false,
      materialDetailRequest: {
        id: undefined,
        name: undefined,
        tag1: undefined,
        tag2: undefined,
        tag3: undefined,
        makerName: undefined,
        makerCharge: undefined,
        makerContact: undefined,
        remarks: undefined
      },
      materialUpdateRequest: {
        id: undefined,
        name: undefined,
        tag1: undefined,
        tag2: undefined,
        tag3: undefined,
        makerName: undefined,
        makerCharge: undefined,
        makerContact: undefined,
        remarks: undefined
      },
      addMaterialRequest: {
        name: undefined,
        tag1: undefined,
        tag2: undefined,
        tag3: undefined,
        makerName: undefined,
        makerCharge: undefined,
        makerContact: undefined,
        remarks: undefined
      }
    };
  },
  created: async function() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      const ret = await axios.get(url.MATERIAL_FIND_ALL);
      this.materials = ret.data.materials;
    },
    rowClick(selectedRow, e) {
      if (e.property != "operation") {
        this.onMaterialDetailModal(selectedRow);
      }
    },
    deleteMaterial: async function(id) {
      await axios.get(url.MATERIAL_DELETE + "/" + id);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "削除完了しました!",
        type: "success"
      });
    },
    onMaterialDetailModal(request) {
      this.materialDetailRequest = request;
      this.materialDetailModalVisible = true;
    },
    hideMaterialDetailModal() {
      this.materialDetailModalVisible = false;
    },
    onMaterialUpdateModal(materialUpdateModalVisible, materialUpdateRequest) {
      this.materialUpdateRequest = materialUpdateRequest;
      this.materialUpdateModalVisible = materialUpdateModalVisible;
    },
    onMaterialAddModal(materialAddModalVisible) {
      this.materialAddModalVisible = materialAddModalVisible;
    },
    async updateMaterial(request) {
      await axios.post(url.MATERIAL_UPDATE, request);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "更新完了しました!",
        type: "success"
      });
      this.materialUpdateModalVisible = false;
    },
    async saveMaterial(request) {
      await axios.post(url.MATERIAL_SAVE, request);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "登録完了しました!",
        type: "success"
      });
      this.materialAddModalVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";
</style>
