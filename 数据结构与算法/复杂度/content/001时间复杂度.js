/* 
时间复杂度 主要衡量的是一个算法的 运行次数
计算机的存储容量达到了很高的程度，我们现在需要关注的是一个算法的时间效率

时间复杂度 的定义：算法的时间复杂度是一个函数，他定量描述了该算法的运行时间。一个算法所花费的时间与其中的语句的执行次数成正比，算法中的基本操作的执行次数，为算法的时间复杂度。
 */

/* 
推导大O阶的方法：
1、用常数1取代运行时间中的所有加法常数
2、在修改后的运行次数函数中，只保留最高阶
3、如果最高阶项存在而且不是1，则去除与这个项相乘的常数，得到的结果就是最大O阶
 */

/* 
在实际中一般关注的是算法运行 最坏 的情况
 */


function fun1 (n) {
  let count = 0;
  for (let k = 0; k < 2 * n; ++k) {
    ++count;
  }
  let m = 10;
  while (m--) {
    ++count
  }
}

fun1(100);
/* 
分析：
for循环中 要运行 2n 次
while循环中 要运行 10 次
加起来是 2n + 10
时间复杂度为 O(n)
 */


/* 
对冒泡排序分析,
每次比较相邻的两个，大的放在两个中的后一个，这未排序的所有元素循环比较一次后都能找到还没有排序成功中最大的，并将其放在未排序的元素的最后一个
 */

function bubbleSort (arr) {
  const len = arr.length;
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}

let arr = [1, 32, 12, 235, 322, 22];
bubbleSort(arr);

/* 
冒泡排序时间复杂度是O(N^2)

要对N - 1个进行排序，每次还需要交换N - 1，N - 2，N - 3，…… 2 ，1

我们把次数相加，等等这怎么有点像等差数列，公差是1，首项是N - 1，尾项是1，项数是N - 1

现在我们就可以用数列的求和公式：((N−1)+1)N/2
省略掉不重要的项数，大O渐进表示法O(N^2)
最好情况是O(N)
如：2,1,3,4,6,5，只需要交换N - 1次
*/

/* 
递归分析
 */
function fun2 (n) {
  if (n < 2) {
    return n;
  } else {
    fun2(n - 1) * n;
  }
}

fun2(100);

/* 
fun2(n) fun2(n-1) fun2(n-2) *** fun2(1)
进行了n次
时间复杂度是 O(n)
 */

