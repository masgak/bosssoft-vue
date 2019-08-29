<template>
  <div class="body">
    <el-row class="rowTitle">
      <label>{{paper.title}}</label>
    </el-row>

    <el-row class="timeTimer">
      <label class="el-icon-bell"></label>
      <label>倒计时:</label>
      <label>{{countTime.hour}}:{{countTime.minute}}:{{countTime.second}}</label>
    </el-row>

    <div
      v-for="(item , index) of paper.subjectList"
      class="subjectDiv"
      v-bind:index="index"
      v-bind:key="item.id"
    >
      <label>{{index + 1}}.{{item.subject}}</label>
      <div v-if="item.categoryId == 1">
        <el-radio-group v-model="item.myAnswer">
          <el-radio
            v-for="(itemAnswer , indexAnswer) of item.answerList"
            v-bind:index="indexAnswer"
            v-bind:key="itemAnswer.id"
            v-bind:label="indexAnswer"
          >{{itemAnswer.answer}}</el-radio>
        </el-radio-group>
      </div>
      <div v-if="item.categoryId == 2">
        <el-radio-group v-model="item.myAnswer">
          <el-radio label="正确">正确</el-radio>
          <el-radio label="错误">错误</el-radio>
        </el-radio-group>
      </div>
      <div v-if="item.categoryId == 3">
        <el-input v-model="item.myAnswer" size="small" class="inputAnswer"></el-input>
      </div>
      <div v-if="item.categoryId == 4">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <br />
    </div>
    <br />
    <div class="submitButton">
      <el-button type="primary" @click="addAnswer">提交</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AnswerPaper",
  data() {
    return {
      paper: {
        title: "JAVA",
        subjectList: [
          {
            qid: 1,
            subjectId: "1",
            subject: "选择题题目",
            categoryId: "1",
            answerList: [
              {
                answer: "A"
              },
              {
                answer: "B"
              },
              {
                answer: "C"
              }
            ],
            myAnswer: ""
          },
          {
            subjectId: "2",
            subject: "选择题题目",
            categoryId: "1",
            answerList: [
              {
                answer: "A"
              },
              {
                answer: "B"
              },
              {
                answer: "C"
              }
            ],
            myAnswer: ""
          },
          {
            subjectId: "3",
            subject: "选择题题目",
            categoryId: "1",
            answerList: [
              {
                answer: "A"
              },
              {
                answer: "B"
              },
              {
                answer: "C"
              }
            ],
            myAnswer: ""
          },
          {
            subjectId: "4",
            subject: "判断题题目",
            categoryId: "2",
            answer: "A.测试A B.测试B",
            myAnswer: ""
          },
          {
            subjectId: "5",
            subject: "判断题题目",
            categoryId: "2",
            answer: "A.测试A B.测试B",
            myAnswer: ""
          },
          {
            subjectId: "6",
            subject: "填空题题目",
            categoryId: "3",
            answer: "",
            myAnswer: ""
          },
          {
            subjectId: "7",
            subject: "问答题题目",
            categoryId: "4",
            answer: "",
            myAnswer: ""
          }
        ],
        imageUrl: ""
      },
      countTime: {
        hour: 1,
        minute: 0,
        second: 10
      }
    };
  },
  mounted() {
    this.add();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addAnswer() {},
    add: function() {
      var _this = this;
      var time = window.setInterval(function() {
        if (
          _this.countTime.second === 0 &&
          _this.countTime.minute === 0 &&
          _this.countTime.hour !== 0
        ) {
          _this.countTime.second = 59;
          _this.countTime.minute = 59;
          _this.countTime.hour -= 1;
        } else if (
          _this.countTime.second === 0 &&
          _this.countTime.minute !== 0
        ) {
          _this.countTime.second = 59;
          _this.countTime.minute -= 1;
        } else if (
          _this.countTime.minute === 0 &&
          _this.countTime.second === 0
        ) {
          _this.countTime.second = 0;
          window.clearInterval(time);
        } else {
          _this.countTime.second -= 1;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.body {
  margin: 3% 3%;
  width: 94%;
}
.timeTimer {
  color: red;
  text-align: right;
}
.rowTitle {
  text-align: center;
}
.subjectDiv {
  text-align: left;
}
.inputAnswer {
  width: 50%;
}
.submitButton {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>