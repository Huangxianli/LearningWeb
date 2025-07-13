import { type FunctionalComponent } from 'vue';

type FnProps = {};
type FnEmits = {};

const FunctionalTest3: FunctionalComponent<FnProps, FnEmits> = function (
  _,
  { slots }
) {
  const getInputValue = (): string => {
    return (
      (document.getElementById('functional_input') as HTMLInputElement)
        ?.value ?? ''
    );
  };
  return (
    <>
      <h3>插槽</h3>
      <input id="functional_input" />
      {slots.default ? slots.default({ getInputValue }) : '默认插槽'}
    </>
  );
};

FunctionalTest3.props = {};
FunctionalTest3.emits = {};

export default FunctionalTest3;
