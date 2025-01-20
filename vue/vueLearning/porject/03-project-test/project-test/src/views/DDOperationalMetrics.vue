<template>
  <section>
    <h3 class="operational-metricstitle-titile">经营指标</h3>
    <div class="operational-metricstitle-content">
      <el-card class="operational-metricstitle-card" v-for="card in operationalMetrics" :key="card.metrickey">
        <div class="operational-metricstitle-card-head">
          <span>{{ card.metricName }}</span>
          <span>说明</span>
        </div>
        <div class="operational-metricstitle-card-metricName">{{ card.value }}</div>
        <div class="operational-metricstitle-card-otherinfo">
          <div class="operational-metricstitle-card-compare">
            <span>同比</span>
            <span>
              <span :class="[card.yearOnYear.upOrDown === 'up' ? 'green' : 'red']">
                {{ card.yearOnYear.upOrDown === 'up' ? '上升' : '下降' }}
              </span>
              <span class="operational-metricstitle-card-compare-value">
                {{ card.yearOnYear.value }}
              </span>
            </span>
            <span>环比</span>
            <span>
              <span :class="[card.monthMonth.upOrDown === 'up' ? 'green' : 'red']">
                {{ card.monthMonth.upOrDown === 'up' ? '上升' : '下降' }}
              </span>
              <span class="operational-metricstitle-card-compare-value">
                {{ card.monthMonth.value }}
              </span>
            </span>
          </div>
          <div class="operational-metricstitle-card-completionRate">
            <span>完成比例</span>
            <span class="operational-metricstitle-card-completionRate-value">{{ card.completionRate }}</span>
          </div>
        </div>
        <div class="operational-metricstitle-card-compare">
          <span>同比</span>
          <span>
            <span>
              {{ card.yearOnYear.upOrDown === 'up' ? '上升' : '下降' }}
            </span>
            <span>
              {{ card.yearOnYear.value }}
            </span>
          </span>
          <span>环比</span>
          <span>
            <span>
              {{ card.monthMonth.upOrDown === 'up' ? '上升' : '下降' }}
            </span>
            <span>
              {{ card.monthMonth.value }}
            </span>
          </span>
        </div>
        <div class="operational-metricstitle-card-completionRate">
          <span>完成比例</span>
          <span>{{ card.completionRate }}</span>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script>
import { operationalMetrics } from '@/mockData/d-d-department-dashboard';
export default {
  data () {
    return {
      operationalMetrics,
    }
  }
}
</script>

<style scoped>
.operational-metricstitle-titile {
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  margin: 0 0 12px 0;
}

.operational-metricstitle-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}


.operational-metricstitle-card {
  margin-bottom: 20px;
  width: 370px;
  height: 180px;
}

.operational-metricstitle-card-head {
  display: inline-block;
  height: 22px;
  /* width: 100%; */
  line-height: 22px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.42);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.operational-metricstitle-card-metricName {
  height: 38px;
  font-size: 30px;
  line-height: 30px;
  font-weight: 400;
  margin-top: 4px;


}

.operational-metricstitle-card-otherinfo {
  margin: 0 11px;
}

.operational-metricstitle-card-compare {
  height: 60px;
  font-size: 14px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.42);
}

.green {
  color: green;
}

.red {
  color: red;
}

.operational-metricstitle-card-compare-value {
  color: rgba(0, 0, 0, 0.64);
}

.operational-metricstitle-card-completionRate {
  box-sizing: border-box;
  height: 38px;
  font-size: 14px;
  line-height: 14px;
  padding: 9px 0;
  color: rgba(0, 0, 0, 0.64);
  border-top: 1px solid rgba(0, 0, 0, 0.20);
}

.operational-metricstitle-card-completionRate-value {
  margin-left: 12px;
}
</style>