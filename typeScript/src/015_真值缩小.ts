function printAll1(str: string | string[] | null) {
  if (str) { // 这里就相当于做了一次真值缩小，如果不进行这一步的话，str 为 null 的时候，也会进入下面的if中
    if (typeof str === "object") {
      for (const s of str) {
        console.log(s);
      }
    }
  }
}

function mutitiplyAll(values: number[] | undefined, factor: number) {
  if (!values) {

  }
}