<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>材料マスタ</span>
        </div>
        <material-add-list v-on:onMaterialAddModal="onMaterialAddModal(true)" />
        <material-add-modal
          v-bind:materialAddModalVisible="materialAddModalVisible"
          v-on:onMaterialAddModal="onMaterialAddModal(false)"
          v-on:saveMaterial="saveMaterial"
        />
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
            <el-table-column prop="tag2" label="タグ2" width="200" />
            <el-table-column prop="tag3" label="タグ3" width="200" />
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
            label="操作"
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
                size="medium"
                type="danger"
                @click="deleteMaterial(scope.row.id)"
                class="b-delete"
                >削除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="c-pagenation"
          background
          layout="prev, pager, next"
          :total="totalElements"
          :page-size="pageSize"
          @current-change="clickPage"
        >
        </el-pagination>
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
  name: "MaterialMaster",
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
      pageRequest: {
        page: 0,
        size: 3
      },
      totalElements: 0,
      pageSize: 3,
      page: 0,
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
      },
      totalCount: 0
    };
  },
  created: async function() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      const ret = await axios.post(
        url.MATERIAL_FIND_ALL_PAGEABLE,
        this.pageRequest
      );
      this.materials = ret.data.materials;
      this.totalElements = ret.data.totalElements;
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
    },
    clickPage(page) {
      this.pageRequest.page = page - 1;
      this.refresh();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/base";
// 一覧内の削除ボタン
.b-delete {
  margin-left: 10px;
}
.c-pagenation {
  margin: 10px 0;
}
</style>
