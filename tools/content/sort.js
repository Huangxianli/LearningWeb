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


/** 
 * 选择排序
 * @param { Array } 需要排序的数组
 * @param { boolean } isOrder 是否是顺序排序
 * @description 选择排序是在未排序的元素中第一个元素和第二个元素比较，记录小的元素的位置，然后小的元素和第三个元素进行比较，记录小的元素的位置，直到比较到最后一个元素，将未排序的第一个元素和最小元素的内容替换；再在未排序的元素中进行前面的操作
 * @example
 *  let arr = [1, 2, 4, 3, 6];
 *  selectionSort(arr, false);
 */

function selectionSort (arr = [], isOrder = true) {
  const arrLength = arr.length;
  for (let i = 0; i <= arrLength - 1; i++) {
    let targetValueIndex = i;
    for (let j = i + 1; j <= arrLength - 1; j++) {
      if ((isOrder && arr[j] < arr[targetValueIndex]) || (!isOrder && arr[j] > arr[targetValueIndex])) {
        targetValueIndex = j;
      }
    }
    if (targetValueIndex !== i) {
      [arr[i], arr[targetValueIndex]] = [arr[targetValueIndex], arr[i]];
    }
  }
}


/**
 * 插入排序
 * @param { Array } arr 需要排序的数组
 * @param { boolean } isOrder 是否是顺序排列
 * @description 插入排序是将数组分为已排序和未排序左右两部分，每次取未排序的第一个，与前面的已排序的内容去比较，找到合适的位置就将该位置后面的数据后移（或者比较一个移动一个元素，直到找到合适的位置）O(n^2)
 * @example
 * let arr = [32, 5, 1, 2, 4, 3, 6, 321];
 * insertionSort(arr, false);
 */

function insertionSort (arr = [], isOrder = true) {
  const arrLength = arr.length;
  for (let lastOrerIndex = 0; lastOrerIndex <= arrLength - 1; lastOrerIndex++) {
    for (let j = lastOrerIndex; j > 0; j--) {
      if ((isOrder && arr[j] < arr[j - 1]) || (!isOrder && arr[j] > arr[j - 1])) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
}

/** 
 * 希尔排序
 * @param { Array } arr 需要排序的数组
 * @param  { boolean } isOrder 是否是顺序排序
 * @description 
 * @example
 */
function shellSort (arr = [], isOrder = true) {
  const arrLength = arr.length;
}



/* 
export { bubbleSort, selectionSort, insertionSort };
 */