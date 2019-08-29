<template>
  <div class="body">
    <el-row :gutter="30" class="row1">
      <label class="lable1">博思考试系统</label>
    </el-row>
    <br />
    <br />
    <el-row :gutter="30" class="row1">
      <label class="lable2">填写个人信息</label>
    </el-row>
    <el-form :rules="rules" :model="userInfo">
      <el-form-item label="手机号：" required="true">
        <el-input v-model="userInfo.tel" size="small" class="userInput"></el-input>
      </el-form-item>

      <el-form-item label="姓名：" required="true">
        &nbsp;&nbsp;
        <el-input v-model="userInfo.name" size="small" class="userInput"></el-input>
      </el-form-item>

      <el-form-item label="性别：" required="true">
        &nbsp;&nbsp;
        <el-select v-model="userInfo.sex" placeholder="请选择" size="small" class="userInput">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addUserInfo">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {
        tel: "",
        name: "",
        sex: "男"
      },
      rules: {
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 7, max: 20, message: "长度在7到20个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      options: [
        {
          value: "男"
        },
        {
          value: "女"
        }
      ],
      publishId: "111"
    };
  },
  mounted: function() {
    //获取传输的publishId
    this.publishId = this.$route.params.publishId;
  },
  methods: {
    addUserInfo() {
      this.$router.push({
        path: `../answerPaper`
      });
    }
  }
};
</script>

<style>
body {
  margin: 10% 10%;
  width: 80%;
  height: 80%;
  text-align: center;
}
.lable1 {
  font-size: 30px;
  font-weight: bold;
}
.lable2 {
  font-size: 20px;
}
.row1 {
  height: 60px;
  text-align: center;
}
.userInput {
  width: 60%;
}
</style>