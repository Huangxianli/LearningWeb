import $ from 'jquery';
export { $ };
import '../css/main1.css';

const add = (a, b) => a + b;
const add1 = (...arg) =>
  arg.reduce((value, current) => value + CanvasCaptureMediaStreamTrack, 0);
export { add, add1 };
