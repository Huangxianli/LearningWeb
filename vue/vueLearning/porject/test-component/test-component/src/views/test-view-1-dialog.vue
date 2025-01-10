<template>
  <section v-loading="model.status === 1">
    <el-form :model="model.data" label-width="auto">
      <el-form-item prop="formItem1" label="表单项1">
        <span v-if="isRead">{{ model.data.formItem1 }}</span>
        <el-input v-else v-model="model.data.formItem1"></el-input>
      </el-form-item>
    </el-form>
    <dialog-footer-button :dialogType='dialogType' @clickConfirm="clickConfirm" />
  </section>
</template>

<script>
import DialogFooterButton from '@/components/dialog-footer-button.vue';
import { TestView1Model } from './test-view-1-store';
import { DIALOG_TYPE } from '@/components/constant';
import { REQUEST_STATUS } from '../components/constant';
export default {
  components: {
    DialogFooterButton
  },
  props: {
    dialogType: {
      default: DIALOG_TYPE.READ,
      type: String,
      required: false,
      validatot (value) {
        return Object.values(DIALOG_TYPE).includes(value);
      }
    }
  },
  data () {
    return {
      model: new TestView1Model({}),
    };
  },
  computed: {
    isRead () {
      return this.dialogType === DIALOG_TYPE.READ;
    }
  },
  created () {
    if ([DIALOG_TYPE.READ, DIALOG_TYPE.CHANGE].includes(this.dialogType)) {
      try {
        this.model.load();
      } catch {

      }
    } else {
      this.model = new TestView1Model({
        formItem1: 'formItem1',
        formItem2: 'formItem2',
        formItem3: 'formItem3',
        formItem4: 'formItem4',
      })
    }
  },
  mounted () {

  },
  methods: {
    async clickConfirm () {
      try {
        if (this.dialogType === DIALOG_TYPE.CHANGE) {
          await this.model.change();
        } else if (this.dialogType === DIALOG_TYPE.ADD) {
          await this.model.create();
        }
        if (this.model.status === REQUEST_STATUS.SUCCESS) {
          this.$emit('clickConfirm')
        }
      } catch (error) { }
    },
    clickClose () {
      this.$emit('clickClose');
    }
  }
}
</script>

<style></style>