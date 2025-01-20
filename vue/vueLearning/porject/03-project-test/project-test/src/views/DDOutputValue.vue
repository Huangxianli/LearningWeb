<template>
  <section class="output-value">
    <h3 class="output-value-titile">产值</h3>
    <section class="output-value-content">
      <el-card class="output-value-card">
        <div class="output-value-card-content">
          <ul class="output-value-card-list">
            <li v-for="(item, index) in outPutListData" :key="item.key" class="output-value-card-list-item">
              <span :class="[[0, 1, 2].includes(item.key) ? 'cb-black' : 'cb-gray', 'output-value-card-info-index']">{{
                (currentPage - 1) * 10 + index + 1
              }}</span>
              <span class="output-value-card-info-name">{{ item.name }}</span>
              <span class="output-value-card-info-amount">{{ item.amount }}</span>
            </li>
          </ul>
          <div class="output-value-card-info-pagination">
            <el-pagination layout="prev, pager, next" small :page-size="10" :total="total"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </el-card>
      <el-card style="height: 440px;  flex-grow: 1;flex-shrink: 1"></el-card>
    </section>
  </section>
</template>

<script>
import { outPutListData } from '@/mockData/d-d-output-value';

export default {
  data () {
    return {
      total: outPutListData.length,
      currentPage: 1,
    };
  },
  computed: {
    outPutListData () {
      return outPutListData.filter((item, index) => index >= (this.currentPage - 1) * 10 && index < this.currentPage * 10)
    }
  },
  methods: {
    handleCurrentChange (value) {
      this.currentPage = value;
    }
  }
}
</script>

<style>
.output-value {
  width: 100%;
}

.output-value-titile {
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  margin: 0 0 12px 0;
}

.output-value-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.output-value-card {
  height: 440px;
  width: 400px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.output-value-card-content {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.output-value-card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: rgba(0, 0, 0, 0.64);
}

.output-value-card-list-item {
  height: 22px;
  margin-bottom: 16px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.output-value-card-info-index {
  display: inline-block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  color: #ffffff;
  background: #001529;
  border-radius: 20px;
  font-size: 13px;
  text-align: center;
  margin-right: 20px;
}

.cb-black {
  background: #001529;
  color: #ffffff;
}

.cb-gray {
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.64);
}

.output-value-card-info-name {
  margin-right: 84px;
}

.output-value-card-info-amount {
  width: 100px;
  margin-right: 0px;
}

.output-value-card-info-pagination {
  display: flex;
  flex-direction: row-reverse;
}
</style>