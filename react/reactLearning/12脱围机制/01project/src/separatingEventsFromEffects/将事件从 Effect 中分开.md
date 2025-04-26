# 将事件从 Effect 中分开

事件处理函数只有在再次执行相同的交互时才会重新运行
Effect 不同，它只有在读取的 props 和 state 值和上一次渲染不一样时，才会重新同步
有的时候，会需要这两种行为的混合体：即一个 Effect 只在响应某些值的时候重新运行，在其他值变化的时候不重新运行

## 在事件处理函数和 Effect 中做选择

**思考一段代码应该放在事件处理函数还是放在 Effect 中，考虑一下为什么代码需要运行**
Effect 允许你指定由渲染自身，而不是特定事件引起的副作用

### 事件处理函数只在响应特定的交互操作时运行

例如发送一条消息，一定是点击了发送按钮或者是键入了 enter 才会触发这个操作，所以应该放在事件处理函数中

### 每当需要同步，Effect 就会运行

如果运行某一段代码的原因不是特定的交互操作，那么就应该放在 Effect 里
例如与聊天室与后端建立连接，这个操作，只要用户看得到这个聊天室就要进行连接，无论是通过何种方式打开的当前聊天室

## 响应式值的响应式逻辑

- 事件处理函数内部的逻辑是非响应式的。除非用户又执行了相同的操作（例如点击），否则这段逻辑不会再运行。事件处理函数可以在“不响应”他们的变化下读取响应式值
- Effect 内部的逻辑是响应式的。如果 Effect 要读取响应式的值，要将它执行为依赖项。如果接下来的重新渲染触发了该值的变化，React 就会使用新值重新运行 Effect 的逻辑

### 事件处理函数内部的逻辑是非响应式的

### Effect 内部的逻辑是响应式的

## 从 Effect 中提取非响应式逻辑

当想要混合响应式逻辑和非响应式逻辑时，事件会变得棘手
例如在切换聊天室的时候会触发一个消息提示，聊天室 id 和消息颜色都是由 props 提供，将这些代码都写在 Effect 里面，这个时候，这个时候，聊天室 id 或者 消息颜色 变化都会引起 Effect 重新执行，就会断开连接，让后重新连接，然后提示，但是切换颜色，按理来说是不要显示重新执行 Effect 的

### 声明一个 Effect Event

**这是一个实验性的 API**
useEffectEvent

```jsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    // useEffectEvent 里面的逻辑是非响应式的，theme prop 不需要放在 useEffect 的依赖里面
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```

### 使用 Effect Event 读取最新的 props 和 state

**这里也是一个没有发布的实验性 api**

```js
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;
  const onVisit = useEffectEvent((visitedUrl) => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]);
  // ...
}
```

### Effect Event 的局限性

- 只在 Effect 内部调用他们
- 永远不要把他们传给其他的组件或者 Hook
