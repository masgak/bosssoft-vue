<!-- 组卷配置管理 -->
<template>
  <div>
    <!--查询部分 -->
    <el-form :inline="true" :model="searchpath" class="demo-form-inline" style="float:left">
      <el-form-item label="组卷配置项标题">
        <el-input type="text" v-model="searchpath.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-form-item>
        <el-button type="primary" @click="queryCombExam">查询</el-button>
      </el-form-item>
    </el-form>
    <edit-form @onSubmit="loadCombExams()" ref="edit"></edit-form>
    <br />
    <br />
    <br />

    <!-- 操作区 -->
    <div style="float:left">
      <el-button
        type="text"
        class="el-icon-plus"
        style="font-size: 15px"
        @click="showAddCombExam"
      >增加</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-delete"
        style="font-size: 15px"
        @click="deleteCombExams"
      >删除</el-button>
      <el-button type="text" class="el-icon-edit" style="font-size: 15px" @click="loadCombExams">刷新</el-button>
      <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <el-button
        type="text"
        class="el-icon-edit"
        style="font-size: 15px"
        @click="checkAndshowEditCombExam"
      >修改</el-button>
    </div>

    <!-- 页面表格 -->
    <el-table
      ref="combExamTable"
      :data="combExams"
      style="width: 100%"
      highlight-current-row
      row-style="height:20px"
      cell-style="padding:0"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      :default-sort="{prop: 'date', order: 'descending'} "
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="配置项" width="120"></el-table-column>
      <el-table-column prop="difficulty" label="难度" sortable width="80"></el-table-column>
      <el-table-column prop="updatedBy" label="修改人" width="60"></el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="160"></el-table-column>
      <el-table-column prop="status" label="启用标志" width="120"></el-table-column>
      <el-table-column prop="company" label="公司" sortable width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" sortable width="120"></el-table-column>
      <el-table-column prop="Action" label="操作">
        <template slot-scope="scope">
          <el-button type="text" class="el-icon-plus" @click="showAddCombExam()"></el-button>
          <el-button type="text" class="el-icon-delete" @click="deleted(scope.row)"></el-button>
          <el-button type="text" class="el-icon-edit" @click="showEditCombExam(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加与修改组卷配置弹窗 -->
    <div>
      <el-form
        :model="combExam"
        :label-position="labelPosition"
        :rules="rules"
        ref="addCombExam"
        style="margin: 0px;
      padding: 0px;"
      >
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogCombExam"
          width="80%"
          @close="cancelEdit"
        >
          <!-- <label>&nbsp;&nbsp;组卷配置信息:&nbsp;&nbsp;</label> -->
          <el-form-item label="配置项名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="combExam.name" placeholder></el-input>
          </el-form-item>

          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio v-model="combExam.status" label="1">是</el-radio>
            <el-radio v-model="combExam.status" label="0">否</el-radio>
          </el-form-item>

          <label>&nbsp;&nbsp;添加配置明细:&nbsp;&nbsp;
          <el-button type="primary" icon="el-icon-plus" plain style="margin-left:10px;" 
          :style="{ display: visibleAddItem }" circle @click="showAddCombExamItem()"/></label>

          <!-- 组卷配置弹窗详情表格 -->
          <el-table
            :data="combExam.combExamItemDTOS"
            style="width: 100%"
            row-style="height:20px"
            cell-style="padding:0"
            @current-change="handleCurrentChange"
            :row-class-name="tableRowClassName"
            :default-sort="{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
          >
            <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
            <el-table-column prop="subjectType" label="题目类别" sortable width="140"></el-table-column>
            <el-table-column prop="category" label="题型" width="140"></el-table-column>
            <el-table-column prop="num" label="题目数量" width="140"></el-table-column>
            <el-table-column prop="difficulty" label="题目难度" width="140"></el-table-column>
            <el-table-column prop="score" label="题目分值" sortable width="140"></el-table-column>
            <el-table-column prop="Action" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="el-icon-plus"
                  @click="showAddCombExamItem(scope.row.combExamId)"
                ></el-button>
                <el-button
                  type="text"
                  class="el-icon-delete"
                  @click="deleteCombExamItem(scope.row)"
                ></el-button>
                <el-button
                  type="text"
                  class="el-icon-edit"
                  @click="showEditCombExamItem(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="addCombExam()"
              :style="{ display: visibleSave }"
            >保 存</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="updateCombExam()"
              :style="{ display: visibleEdit }"
            >更 新</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>

    <!-- 添加与修改组卷配置详情弹窗 -->
    <div>
      <el-form
        :model="combExamItem"
        :label-position="labelPosition"
        :rules="rules"
        ref="addCombExamItem"
        style="margin: 0px;
      padding: 0px;"
      >
        <!-- close-on-click-modal 点击空白处是否关闭弹窗 -->
        <el-dialog
          :title="dialogItemTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogCombExamItem"
          width="50%"
          @close="cancelEditItem"
        >
          <el-form-item prop="subjectTypeId" label="类别">
            <el-select
              v-model="combExamItem.subjectTypeId"
              placeholder="请选择题目类别"
              style="width:200px"
            >
              <el-option
                v-for="item in subjecttypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="categoryId" label="题型">
            <el-select v-model="combExamItem.categoryId" placeholder="请选择题型" style="width:200px">
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="difficulty" label="难度">
            <el-select v-model="combExamItem.difficulty" placeholder="请选择难度" style="width:200px">
              <el-option
                v-for="item in difficuty"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="num" label="题目数量">
            <el-input type="textarea" v-model="combExamItem.num"></el-input>
          </el-form-item>

          <el-form-item prop="score" label="题目分值">
            <el-input type="textarea" v-model="combExamItem.score"></el-input>
          </el-form-item>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEditItem">取 消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="addCombExamItem()"
              :style="{ display: visibleItemSave }"
            >保 存</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="updateCombExamItem()"
              :style="{ display: visibleItemEdit }"
            >更 新</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>

    <!-- 分页 -->
    <div>
      <el-pagination
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>

    <!-- 题目详情表格 -->
    <el-table
      :data="combExam.combExamItemDTOS"
      style="width: 100%"
      row-style="height:20px"
      cell-style="padding:0"
      :row-class-name="tableRowClassName"
      :default-sort="{prop: 'DictionaryType,StartTag', order: 'Ascending'}"
    >
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column prop="subjectType" label="题目类别" sortable width="140"></el-table-column>
      <el-table-column prop="category" label="题型" width="140"></el-table-column>
      <el-table-column prop="num" label="题目数量" width="140"></el-table-column>
      <el-table-column prop="difficulty" label="题目难度" width="140"></el-table-column>
      <el-table-column prop="score" label="题目分值" sortable width="100"></el-table-column>
      <el-table-column prop="Action" label="操作">
        <template slot-scope="scope">
                <el-button
                  type="text"
                  class="el-icon-plus"
                  @click="showAddCombExamItem(scope.row.combExamId)"
                ></el-button>
                <el-button
                  type="text"
                  class="el-icon-delete"
                  @click="deleteCombExamItem(scope.row)"
                ></el-button>
                <el-button
                  type="text"
                  class="el-icon-edit"
                  @click="showEditCombExamItem(scope.row)"
                ></el-button>
              </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { log } from "util";
import {
  loadCombExams,
  queryCombExam,
  addCombExam,
  updateCombExam,
  deleteCombExams,
  addCombExamItem,
  updateCombExamItem,
  deleteCombExamItem
} from "../../api/index";
import { constants } from "crypto";
export default {
  name: "BasicData",

  data() {
    return {
      //组卷配置表格中数据
      combExams: [
        {
          name: "",
          difficulty: "",
          updatedBy: "",
          updatedTime: "",
          status: "",
          company: "",
          remark: "",
          combExamItemDTOS: [
            {
              id: "",
              subjectType: "",
              category: "",
              num: "",
              difficulty: "",
              score: ""
            }
          ]
        }
      ],

      //组卷配置弹窗中的数据
      combExam: [
        {
          id: "",
          subjectType: "",
          category: "",
          num: "",
          difficulty: "",
          score: ""
        }
      ],
      //组卷配置详细数据
      combExamItem: {
        id: "",
        subjectType: "",
        category: "",
        num: "",
        difficulty: "",
        score: "",
        //对应的配置项Id
        combExamId: ""
      },
      //表单中列表数据
      subjecttypes: [
        { id: 3, name: "体育题" },
        { id: 2, name: "文学题" },
        { id: 1, name: "专业题" }
      ],
      categories: [
        { id: 3, name: "上机题" },
        { id: 2, name: "填空题" },
        { id: 1, name: "选择题" }
      ],
      difficuty: [
        { id: 3, name: "困难" },
        { id: 2, name: "一般" },
        { id: 1, name: "简单" }
      ],
      //前端校验 @blur 当元素失去焦点时触发blur事件
      rules: {
        name: [{ required: true, message: "组卷配置名称必填", trigger: "blur" }]
      },
      //弹窗数据右对齐
      labelPosition: "right",
      // 搜索框数据
      searchpath: {
        name: ""
      },
      //添加与修改弹窗显示与否
      dialogCombExam: false,
      //添加与修改配置详细弹窗显示与否
      dialogCombExamItem: false,
      //用于分页的数据
      currentPage: 1,
      pageSize: 10,
      //默认隐藏编辑按钮
      visibleEdit: "none",
      //默认显示新增按钮
      visibleSave: "",
      //默认隐藏配置详细编辑按钮
      visibleItemEdit: "none",
      //默认显示配置详细新增按钮
      visibleItemSave: "",
      //默认隐藏增加配置按钮
      visibleAddItem: ""
    };
  },

  methods: {
    indexMethod(index) {
      return index + 1;
    },
    //显示添加数据弹窗
    showAddCombExam() {
      //设置弹窗表头
      this.dialogTitle = "添加组卷配置";
      this.emptyCombExam();
      this.visibleAddItem = "",
      this.visibleEdit = "none",
      this.visibleSave = "",
      this.dialogCombExam = true;
    },
    //显示添加配置详细弹窗
    showAddCombExamItem(combExamId) {
      console.log(combExamId);
      this.dialogItemTitle = "添加组卷配置详细项";
      // this.visibleAddItem = "";
      this.combExamItem.combExamId = combExamId;
      this.visibleItemEdit = "none",
      this.visibleItemSave = "",
      this.dialogCombExamItem = true;
    },
    //取消弹窗
    cancelEdit() {
      this.dialogCombExam = false;
      this.emptyCombExam();
    },
    //取消配置详细弹窗
    cancelEditItem() {
      this.dialogCombExamItem = false;
      this.emptyCombExamItem();
    },
    emptyCombExamItem() {
      this.combExamItem = {
      };
    },
    //清除弹窗内容
    emptyCombExam() {
      this.combExam = {
        name: "",
        status: ""
      };
    },
    //修改本行
    showEditCombExam(row) {
      this.dialogTitle = "编辑组卷配置";
      this.combExam = row;
      this.combExam.name = row.name;
      //显示编辑按钮，隐藏新增按钮
      this.visibleAddItem = "none",
      this.visibleEdit = "",
      this.visibleSave = "none",
      this.dialogCombExam = true;
    },
    //修改组卷配置详细项数据
    showEditCombExamItem(row) {
      console.log(row);
      this.dialogItemTitle = "编辑组卷配置详细项";
      this.combExamItem = row;
      //显示编辑按钮，隐藏新增按钮
      this.visibleItemEdit = "",
      this.visibleItemSave = "none",
      this.dialogCombExamItem = true;
    },
    // 页面加载完成后加载数据
    mounted: function() {
      this.loadCombExams();
    },
    // 每一行多选选中时触发该方法
    handleSelectionChange(sels) {
      this.sels = sels;
    },
    // 加载数据方法
    loadCombExams() {
      var _this = this;
      loadCombExams()
        .then(resp => {
          if (resp) {
            console.log("获取的值" + resp);
            _this.combExams = resp;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据载入失败",
            duration: 1000
          });
        });
    },
    // 根据所选的id删除相应数据
    deleteCombExamItem(row) {
      console.log(row);
      this.combExamItem = row;
      this.$confirm("确认要删除该配置信息吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCombExamItem({
            requestHead: {
              version: "1",
              businessType: "1",
              deviceId: "1",
              deviceType: "1",
              encryption: "1"
            },
            body: this.combExamItem            
          }).then(resp => {
            if (resp) {
              this.$notify({
                title: "成功",
                message: "数据已成功删除",
                type: "success",
                duration: 1000
              });
              // 若删除成功则重新刷新页面
              this.loadCombExams();
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
    // 删除组卷配置详细
    deleteCombExams () {
        this.$confirm(
        "此操作将删除[" + this.sels.length + "]条组卷记录,且其子项也会被删除，是否继续?",
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
          deleteCombExams( {
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
              this.loadCombExams()
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
    addCombExamItem() {
      console.log(this.combExamItem);
      this.$axios;
      addCombExamItem({
        requestHead: {
          version: "1",
          businessType: "1",
          deviceId: "1",
          deviceType: "1",
          encryption: "1"
        },
        body: this.combExamItem
      })
        .then(resp => {
          // 成功增加数据后刷新页面
          if (resp) {
            this.$notify({
              title: "成功",
              message: "数据已成功插入",
              type: "success",
              duration: 1500
            });
            this.loadCombExams();
            this.dialogCombExamItem = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据插入失败",
            duration: 1000
          });
        });
    },
    updateCombExam(){
      console.log(this.combExam);
      this.$axios;
      updateCombExam({
        requestHead: {
          version: "1",
          businessType: "1",
          deviceId: "1",
          deviceType: "1",
          encryption: "1"
        },
        body: this.combExam
      })
        .then(resp => {
          // 成功增加数据后刷新页面
          if (resp) {
            this.$notify({
              title: "成功",
              message: "数据已成功更新",
              type: "success",
              duration: 1500
            });
            this.loadCombExams();
            this.dialogCombExam = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据更新失败",
            duration: 1000
          });
        });
    },
    updateCombExamItem() {
      console.log(this.combExamItem);
      this.$axios;
      updateCombExamItem({
        requestHead: {
          version: "1",
          businessType: "1",
          deviceId: "1",
          deviceType: "1",
          encryption: "1"
        },
        body: this.combExamItem
      })
        .then(resp => {
          // 成功增加数据后刷新页面
          if (resp) {
            this.$notify({
              title: "成功",
              message: "数据已成功更新",
              type: "success",
              duration: 1500
            });
            this.loadCombExams();
            this.dialogCombExamItem = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据更新失败",
            duration: 1000
          });
        });
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.combExam = val;
      console.log(val);
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>