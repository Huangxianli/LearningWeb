/**
 * WeakRef
 */
function test1 () {
  console.log('---test1-------------------------------------');
  const obj1_1 = {}
  const weakRef1_1 = new WeakRef(obj1_1);
  const registry1_1 = new FinalizationRegirsty(() => {
  })
};
test1();