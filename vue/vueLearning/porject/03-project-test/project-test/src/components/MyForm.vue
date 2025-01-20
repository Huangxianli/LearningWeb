<template>
  <el-form v-bind="$attrs" :model="formData">
    <el-row>
      <template v-for="item in formInfo">
        <el-col :key="item.label" v-if="item.inline" :span="24">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input v-if="item.type === 'input'" v-model="formData[item.prop]"></el-input>
            <el-select v-else-if="item.type === 'select'">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :key="item.label" v-else :span="24 / numberOfColumns">
          <el-form-item :label="item.label" :prop="item.prop">
          </el-form-item>
        </el-col>
      </template>

    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    numberOfColumns: {
      default: 2
    },
    formInfo: {
      default: () => [
        {
          label: '1',
          prop: '1',
          inline: true,
          type: 'input',
        },
        {
          prop: '2',
          label: '2',
          type: 'select',
          options: [
            {
              label: 1,
              value: 1
            },
            {
              label: 1,
              value: 1
            },

          ]
        },
        {
          prop: '3',
          label: '3',
          type: 'input',
        },
        {
          prop: '4',
          label: '4'
        },
        {
          prop: '5',
          label: '5'
        },
        {
          prop: '6',
          label: '6'
        }
      ]
    },
    modelValue: {
      default: () => ({})
    }
  },
  data () {
    return {
      formData: {},
    }
  }


}
</script>

<style></style>