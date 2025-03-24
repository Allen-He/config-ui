---
title: HelloWorld 组件
sidebar: auto
---

# HelloWorld 组件

## 简介

`HelloWorld` 是一个简单的组件，用于展示一条问候消息。它可以通过传递 `name` 属性来自定义问候对象。

## 使用方法

### 引入组件

确保已安装并正确配置了项目依赖后，可以通过以下方式引入 `HelloWorld` 组件：

```javascript
import HelloWorld from 'path-to-your-component/HelloWorld'
```

### 属性说明

| 属性名 | 类型   | 默认值  | 必填 | 描述               |
| ------ | ------ | ------- | ---- | ------------------ |
| `name` | string | `World` | 否   | 自定义问候的名称。 |

## 示例代码

以下是一个简单的使用示例：

```javascript
import React from 'react'
import HelloWorld from 'path-to-your-component/HelloWorld'

function App() {
  return (
    <div>
      {/* 默认问候 */}
      <HelloWorld />

      {/* 自定义问候 */}
      <HelloWorld name="Allen" />
    </div>
  )
}

export default App
```

运行上述代码后，页面将显示以下内容：

```
Hello, World!
Hello, Allen!
```
