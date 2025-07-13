import { defineComponent } from 'vue';
import SlotTest6_1 from './SlotTest6_1';
export default defineComponent({
  setup() {
    type DeafaultSlotType = InstanceType<
      typeof SlotTest6_1
    >['$slots']['default'];
    type ParmarsType<T> = T extends (props: infer P) => any ? P : never;
    type DeafaultSlotParamsType = ParmarsType<DeafaultSlotType>;

    return () => (
      <>
        <SlotTest6_1>
          {{
            default: (props: DeafaultSlotParamsType) =>
              props.list.value.map((item) => (
                <div key={item.id}>{item.name}</div>
              )),
          }}
        </SlotTest6_1>
        <SlotTest6_1
          v-slots={{
            default: (props: DeafaultSlotParamsType) =>
              props.list.value.map((item) => (
                <div key={item.id}>{item.name}</div>
              )),
          }}
        ></SlotTest6_1>
      </>
    );
  },
});
