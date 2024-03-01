/* 排序方法 */

/**
 * 冒泡排序
 * @param { Array } arr 需要排序的数组
 * @param { boolean } isOrder 是否是顺序排序
 * @description 按照顺序一次的比较相邻的两个元素，将其中较大的数，放在后面，第一次循环完，最大的数就在最后；最后一个数就不在参与循环了；当循环到只有两个数要比较的时候，就是最后一次循环了，时间复杂度为O(n^2)
 * @example
 *  let arr = [1, 5, 2, 3, 6];
 *  bubbleSort(arr, false);
 */
function bubbleSort (arr = [], isOrder = true) {
  const arrLength = arr.length;
  for (let i = 0; i < arrLength - 1; i++) {
    for (let j = 0; j < arrLength - i; j++) {
      if ((isOrder && arr[j] > arr[j + 1]) || (!isOrder && arr[j] < arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

export { bubbleSort };