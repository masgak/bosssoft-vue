<!-- 题型管理-->
<template>
  <div>
    <!--查询部分-->
    <el-form :inline="true" :model="searchpath">
      <el-form-item label="题目类型:">
        <el-input type="text" placeholder="请输入题目类型" v-model="searchpath.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- <edit-form @onSubmit="loadSubjectTypes()" ref="edit"></edit-form> -->

    <!-- 操作区 -->
    <div style="float:left">
      <el-button
        type="text"
        class="el-icon-plus"
        style="font-size: 15px"
        @click="showAddSubjectType"
      >增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-delete"
        style="font-size: 15px"
        @click="deleteSubjectTypes"
      >批量删除</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-edit"
        style="font-size: 15px"
        @click="checkAndShowEditSubjectType"
      >修改</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-edit"
        style="font-size: 15px"
        @click="loadSubjectTypes"
      >刷新</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-sort-down"
        style="font-size: 15px"
        @click="dialogUpload = true"
      >导入</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-sort-up"
        style="font-size: 15px"
        @click="dialogDownload = true"
      >导出</el-button>
    </div>

    <!-- 显示题目类型表格 -->
    <div>
      <el-table
        ref="subjectTypetable"
        stripe
        :data="subjectTypes.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        row-style="height:20px"
        cell-style="padding:0"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'updatedTime', order: 'descending'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="题目类型" sortable width="200"></el-table-column>
        <el-table-column prop="remark" label="备注信息" width="230"></el-table-column>
        <el-table-column prop="updatedTime" label="更新时间" sortable width="140"></el-table-column>
        <el-table-column prop="status" label="启用标记" sortable width="140"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="el-icon-plus" @click="showAddSubjectType"></el-button>
            <el-button type="text" class="el-icon-delete" @click="deleteSubjectType(scope.row)"></el-button>
            <el-button type="text" class="el-icon-edit" @click="showEditSubjectType(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加/修改题目类型弹窗 -->
    <div>
      <el-form
        :model="subjectType"
        :label-position="labelPosition"
        :rules="rules"
        ref="addSubjectType"
        style="margin: 0px;
      padding: 0px;"
      >
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogSubjectType"
          width="50%"
          @close="cancelEidt"
        >
          <el-form-item label="题目类型：" prop="name">
            <el-input v-model="subjectType.name"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：" prop="status">
            <el-radio-group v-model="subjectType.status">
              <el-radio :label=1>是</el-radio>
              <el-radio :label=0>否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注信息：">
            <el-input type="textarea" :rows="7" v-model="subjectType.remark"></el-input>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addSubjectType" :style="{ display: visibleSave }">保 存</el-button>
            <el-button size="mini" type="primary" @click="updateSubjectType" :style="{ display: visibleEdit }">更 新</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>

    <!-- 导入文件对话框 -->
    <div>
      <el-dialog title="导入" :visible.sync="dialogUpload" width="30%" :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且需符合相应格式</div>
        </el-upload>
      </el-dialog>
    </div>

    <!-- 导出文件对话框 -->
    <div>
      <el-dialog
        title="导出"
        :visible.sync="dialogDownload"
        width="20%"
        :before-close="handleClose"
        center
      >
        <el-input style="width: 200px;" v-model="filename"></el-input>
        <label>.xls</label>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" round @click="exportExcel">保存</el-button>
          <el-button size="small" round type="primary" @click="dialogDownload = false">取消</el-button>
        </div>
        <div slot="tip">只能导出excel文件，且需符合相应格式</div>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { loadSubjectTypes,querySubjectType,addSubjectType,deleteSubjectTypes,updateSubjectType } from "../../api/index";
export default {
  data() {
    return {
      filename:"题型",
      subjectTypes: [],
      //弹窗显示与否
      dialogSubjectType: false,
      dialogUpload: false,
      dialogDownload: false,
      //默认隐藏编辑按钮
      visibleEdit: "none",
      //默认显示新增按钮
      visibleSave: "",
      //添加与修改弹窗中的数值
      subjectType: {
        name: "",
        status: 1,
        remark: ""
      },

      //前端校验
      rules: {
        name: [
          { required: true, message: "题目类型名称必填", trigger: "blur" }
        ],
        status: [{ required: true, message: "是否启用必选", trigger: "blur" }]
      },

      //用于分页的数据
      currentPage: 1,
      pageSize: 10,
      //多选选中值的坐标，用于批量删除
      sels: [],
      searchpath: {
        name: ""
      }
    };
  },
  // 页面加载完成后加载数据
  mounted: function() {
    this.loadSubjectTypes();
  },
  methods: {
    //加载SubjectType表格
    loadSubjectTypes() {
      var _this = this;
      loadSubjectTypes().then(resp => {
        if (resp) {
          _this.subjectTypes = resp;
        }
      });
    },
    // 每一行多选选中时触发该方法
    handleSelectionChange(sels) {
      this.sels = sels;
    },
    //搜索
    querySubjectType() {
      var _this = this;
      this.$axios
        .post("/search", {
          name: this.searchpath.name
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.$notify({
              title: "成功",
              message: "查询结果如下",
              type: "success",
              duration: 1000
            });
            // 若搜索成功则重新刷新页面
            _this.subjectTypes = resp.data;
          }
        });
    },
    //显示增加/修改数据弹窗
    showAddSubjectType() {
      this.dialogTitle = "添加题目类型";
      this.visibleEdit = "none",
      this.visibleSave = "",
      this.dialogSubjectType = true;
    },
    //增加题型
    addSubjectType() {
      addSubjectType({
          requestHead: {
              version: '1',
              businessType: '1',
              deviceId: '1',
              deviceType: '1',
              encryption: '1'
            },
            body: this.subjectType
        })
        .then(resp => {
          this.$notify({
            title: "成功",
            message: "数据已成功插入",
            type: "success",
            duration: 1500
          });
          this.loadSubjectTypes();
          this.dialogSubjectType = false;
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "插入数据失败",
            duration: 1000
          });
        });
    },
    
    //修改题型
       updateSubjectType() {
      updateSubjectType({
          requestHead: {
              version: '1',
              businessType: '1',
              deviceId: '1',
              deviceType: '1',
              encryption: '1'
            },
            body: this.subjectType
        })
        .then(resp => {
          this.$notify({
            title: "成功",
            message: "数据已成功更新",
            type: "success",
            duration: 1500
          });
          this.loadSubjectTypes();
          this.dialogSubjectType = false;
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "修改数据失败",
            duration: 1000
          });
        });
    },

    //取消弹窗
    cancelEidt() {
      this.dialogSubjectType = false;
      this.emptySubjectType();
    },
    //清除弹窗表单内容
    emptySubjectType() {
      this.subjectType = {
        name: "",
        status: 1,
        remark: ""
      };
    },

    //显示修改数据弹窗
    //多行检查后再修改
    checkAndShowEditSubjectType() {
      if (this.sels.length > 1) {
        this.$message({
          message: "不可以同时编辑多行",
          type: "warning",
          duration: 1000
        });
        return 0;
      } else if (this.sels.length < 1) {
        this.$message({
          message: "请选择要编辑的行",
          type: "warning",
          duration: 1000
        });
        return 0;
      }
      this.showEditSubjectType(this.$refs.subjectTypetable.selection[0]);
    },
    //修改本行
    showEditSubjectType(row) {
      this.dialogTitle = "编辑题目类型";
      this.subjectType = row;
      this.subjectType.name = row.name;
      this.subjectType.status = row.status;
      this.subjectType.remark = row.remark;
      //显示编辑按钮，隐藏新增按钮
      this.visibleEdit = "",
      this.visibleSave = "none",
      this.dialogSubjectType = true;
    },
    
    // 根据所选的id删除相应数据
    deleteSubjectType(row) {
      this.$confirm("确认要删除该题型吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSubjectTypes({
            requestHead: {
              version: '1',
              businessType: '1',
              deviceId: '1',
              deviceType: '1',
              encryption: '1'
            },
            body: [{
              id: row.id,
              version: row.version
            }]
          }).then(resp => {
            if (resp) {
              this.$notify({
                title: "成功",
                message: "数据已成功删除",
                type: "success",
                duration: 1000
              });
              // 若删除成功则重新刷新页面
              this.loadSubjectTypes();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000
          });
        });
    },
    // 批量删除数据
    deleteSubjectTypes () {
        this.$confirm(
        "此操作将删除[" + this.sels.length + "]条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
           console.log(this.sels)
          // console.log(this.$refs.multipleTable.selection)
          deleteSubjectTypes( {
            requestHead: {
              version: '1',
              businessType: '1',
              deviceId: '1',
              deviceType: '1',
              encryption: '1'
            },
            body: this.sels
          }).then(resp => {
            console.log(resp)
            if (resp) {
              var _this = this
              this.$notify({
                title: '成功',
                message: '数据已成功删除',
                type: 'success',
                duration: 1000
              })
              // 若删除成功则重新刷新页面
              this.loadSubjectTypes()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          })
        })
    },

    //导出为excel文件
    exportExcel (){
        this.$axios.post("/setSubjectTypeFilename", this.filename)
        .then(resp => {
          if (resp && resp.status === 200) {
            window.location.href = 'http://localhost:10001/api/excelSubjectType';
            this.dialogDownload=false;
          }
        });
        
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style>
.el-upload.el-upload--text {
  width: 80px;
  height: 35px;
  border: 0px;
}
</style>