<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span></span>
        </div>
        <div style="margin-bottom: 20px;display: flex;">
          <el-input
            placeholder="Please input"
            v-model="input"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="Select">
              <el-option label="材料" value="1"></el-option>
              <el-option label="タグ" value="2"></el-option>
              <el-option label="メーカー" value="3"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
          <material-add-list
            style="margin-left: 20px;"
            v-on:onMaterialAddModal="onMaterialAddModal(true)"
          />
          <material-add-modal
            v-bind:materialAddModalVisible="materialAddModalVisible"
            v-on:onMaterialAddModal="onMaterialAddModal(false)"
            v-on:saveMaterial="saveMaterial"
          />
        </div>

        <material-detail-modal
          v-bind:materialDetailModalVisible="materialDetailModalVisible"
          v-bind:materialDetailRequest="materialRequest"
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
                v-bind:materialUpdateRequest="materialRequest"
                v-on:onMaterialUpdateModal="
                  onMaterialUpdateModal(false, materialRequest)
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
import MixMate from "@/mixin/Http.js";
import MaterialDetailModal from "@/components/material/MaterialDetailModal.vue";
import MaterialUpdateList from "@/components/material/MaterialUpdateList.vue";
import MaterialUpdateModal from "@/components/material/MaterialUpdateModal.vue";
import MaterialAddList from "@/components/material/MaterialAddList.vue";
import MaterialAddModal from "@/components/material/MaterialAddModal.vue";
import url from "@/mixin/UrlMixin.js";

export default {
  name: "Plan",
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
        size: 3,
        searchItem: this.select,
        value: this.input
      },
      totalElements: 0,
      pageSize: 3,
      page: 0,
      materialRequest: {
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
      totalCount: 0,
      select: "",
      input: ""
    };
  },
  created: async function() {
    await this.refresh();
  },
  methods: {
    ////////////////// 一覧
    async refresh() {
      await MixMate.post(url.MATERIAL_FIND_ALL_PAGEABLE, this.pageRequest)
        .then(response => {
          // データ更新
          this.materials = response.data.materials;
          // ページネーション設定
          this.totalElements = response.data.totalElements;
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$router.push("/signin");
          }
        });
    },
    ////////////////// 一覧
    async search() {
      // ページ設定
      this.pageRequest.page = 0;
      this.pageRequest.searchItem = this.select;
      this.pageRequest.value = this.input;
      await this.refresh();

      // FIXME 1ページ目に戻せない
      this.page = 0;
    },
    ////////////////// 削除
    // 削除ボタンクリック
    deleteMaterial: async function(id) {
      let deleteUrl = url.MATERIAL_DELETE + "/" + id;
      await MixMate.get(deleteUrl)
        .then(() => {
          this.refresh();
          this.$message({
            showClose: true,
            message: "削除完了しました!",
            type: "success"
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    ////////////////// 詳細モーダル
    // 行クリック
    rowClick(selectedRow, e) {
      // 操作列以外の行クリック
      if (e.property != "operation") {
        // 詳細モーダル
        this.onMaterialDetailModal(selectedRow);
      }
    },

    // 詳細モーダルオープン
    onMaterialDetailModal(request) {
      this.materialDetailRequest = request;
      this.materialDetailModalVisible = true;
    },
    // 詳細モーダルクローズ
    hideMaterialDetailModal() {
      this.materialDetailModalVisible = false;
    },
    ////////////////// 更新モーダル
    // 更新モーダルオープン
    onMaterialUpdateModal(materialUpdateModalVisible, materialUpdateRequest) {
      this.materialUpdateRequest = materialUpdateRequest;
      this.materialUpdateModalVisible = materialUpdateModalVisible;
    },
    // 更新
    async updateMaterial(request) {
      await MixMate.post(url.MATERIAL_UPDATE, request);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "更新完了しました!",
        type: "success"
      });
      this.materialUpdateModalVisible = false;
    },
    ////////////////// 登録モーダル
    // 登録モーダル
    onMaterialAddModal(materialAddModalVisible) {
      this.materialAddModalVisible = materialAddModalVisible;
    },
    // 登録
    async saveMaterial(request) {
      await MixMate.post(url.MATERIAL_SAVE, request);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "登録完了しました!",
        type: "success"
      });
      this.materialAddModalVisible = false;
    },
    ////////////////// ページャ
    // ページャークリック
    clickPage(page) {
      // ページ設定
      this.pageRequest.page = page - 1;
      // 一覧更新
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
.el-select {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
