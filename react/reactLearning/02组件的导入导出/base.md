```js
// A.js
export default function AComponent() {}
// B.js
import AComponent from 'A.js';

// A.js
export function AComponent() {}
// B.js
import { AComponent } from 'A.js';
```
