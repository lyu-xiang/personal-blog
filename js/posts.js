/**
 * 文章数据源
 * 新增文章只需在这里追加一个对象即可，
 * content 字段直接写 HTML（代码块里的 < > 用 &lt; &gt; 转义）。
 */
const posts = [
  {
    id: 'html5-semantic',
    title: '使用 HTML5 语义化标签构建现代网页',
    date: '2026-10-12',
    tags: ['HTML', '前端'],
    excerpt: '为什么应该用 header、main、article 而不是满屏的 div？语义化标签对 SEO、无障碍和可维护性的真实价值。',
    content: `
      <p>刚开始写网页时，很多人习惯用 <code>&lt;div&gt;</code> 包打天下——<code>&lt;div class="header"&gt;</code>、<code>&lt;div class="nav"&gt;</code>，一路写到 <code>&lt;div class="footer"&gt;</code>。页面能跑，但代码本身不传达任何结构信息。</p>

      <h2>什么是语义化标签</h2>
      <p>HTML5 提供了一组自带含义的标签：<code>&lt;header&gt;</code>、<code>&lt;nav&gt;</code>、<code>&lt;main&gt;</code>、<code>&lt;article&gt;</code>、<code>&lt;section&gt;</code>、<code>&lt;aside&gt;</code>、<code>&lt;footer&gt;</code>。它们的名字就直接描述了内容在页面中的角色。</p>

      <pre><code>&lt;header&gt;
  &lt;nav&gt;导航栏&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;文章标题&lt;/h1&gt;
    &lt;p&gt;正文内容&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;版权信息&lt;/footer&gt;</code></pre>

      <h2>为什么值得用</h2>
      <ul>
        <li><strong>搜索引擎更友好：</strong>爬虫能更准确地判断哪里是正文、哪里是导航。</li>
        <li><strong>无障碍访问：</strong>屏幕阅读器可以依据语义为用户提供大纲和快捷跳转。</li>
        <li><strong>可维护性：</strong>读代码的人一眼就能看懂结构，不必逐个拆解 class 命名。</li>
      </ul>

      <h2>几个易混点</h2>
      <p><code>&lt;article&gt;</code> 强调「独立、可被单独分发」的内容，比如一篇博客或一条评论；<code>&lt;section&gt;</code> 则是「同一主题下的一组内容」，通常需要搭配标题使用。判断标准很简单：把这段内容单独摘出去还能不能成立？能，就是 <code>&lt;article&gt;</code>。</p>

      <p>语义化不是玄学，而是让代码本身成为文档的一部分。下一次搭页面时，试着先用语义标签画出骨架，再考虑样式。</p>
    `
  },
  {
    id: 'flexbox-vs-grid',
    title: 'CSS Grid 与 Flexbox：如何选择布局方案',
    date: '2026-10-08',
    tags: ['CSS', '前端'],
    excerpt: '一维用 Flexbox，二维用 Grid——但真正的区别比这句口诀更细腻。本文用实例拆解两者的适用边界。',
    content: `
      <p>「一维用 Flexbox，二维用 Grid」是最常见的口诀，也基本正确。但在实际项目里，两者的边界往往比想象中模糊。</p>

      <h2>Flexbox 擅长什么</h2>
      <p>Flexbox 沿<strong>单一方向</strong>分配空间，特别适合内容尺寸未知、需要自动伸缩的场景：导航栏、按钮组、卡片内部的元素排列。</p>

      <pre><code>.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>

      <p>它的核心思路是「让子项在主轴方向上弹性伸缩」，换行之后每一行彼此独立，很难做整体对齐。</p>

      <h2>Grid 擅长什么</h2>
      <p>Grid 在<strong>两个方向</strong>上同时控制布局，适合需要严格行列对齐的场景：整页骨架、图片画廊、仪表盘。</p>

      <pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}</code></pre>

      <p>上面这行 <code>auto-fill + minmax</code> 几乎成了响应式卡片的标配写法——列数随容器宽度自动增减，无需任何媒体查询。</p>

      <h2>实战建议</h2>
      <ul>
        <li>整体页面结构：<strong>Grid</strong>（header / main / aside / footer）。</li>
        <li>局部组件内部排列：<strong>Flexbox</strong>。</li>
        <li>不确定时先写 Flexbox，等发现需要行列同时对齐再换 Grid。</li>
      </ul>

      <p>它们不是竞争关系，而是互补的。熟练之后，你会自然地在同一页面里混用两者。</p>
    `
  },
  {
    id: 'js-closure',
    title: 'JavaScript 中的闭包与作用域链',
    date: '2026-10-01',
    tags: ['JavaScript', '编程基础'],
    excerpt: '闭包是每个 JS 开发者绕不开的概念。从作用域链出发，理解闭包为什么存在、以及它如何造成常见的循环陷阱。',
    content: `
      <p>闭包（Closure）几乎是 JavaScript 面试的必考题，但很多人能背出定义，却说不清它背后的机制。</p>

      <h2>先理解作用域链</h2>
      <p>JS 采用<strong>词法作用域</strong>：函数在定义时，就决定了它能访问哪些变量。当内层函数引用了外层函数的变量，即便外层函数已经执行完毕，这些变量也不会被回收——因为内层函数「记得」它们。</p>

      <pre><code>function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2</code></pre>

      <p>这里的 <code>count</code> 对外部不可见，却能在多次调用之间保持状态——这就是闭包最经典的用途：<strong>创建私有状态</strong>。</p>

      <h2>经典陷阱：循环里的 var</h2>

      <pre><code>for (var i = 0; i &lt; 3; i++) {
  setTimeout(() =&gt; console.log(i), 100);
}
// 输出：3 3 3</code></pre>

      <p>因为 <code>var</code> 只有函数作用域，三个回调共享同一个 <code>i</code>，循环结束时它已经是 3。把 <code>var</code> 换成 <code>let</code>，或使用 IIFE 包裹一层作用域，即可得到 0、1、2。</p>

      <h2>闭包的实际价值</h2>
      <ul>
        <li><strong>封装私有变量：</strong>不借助 class 也能隐藏内部状态。</li>
        <li><strong>函数工厂：</strong>批量生成行为相近、配置不同的函数。</li>
        <li><strong>记忆化：</strong>缓存计算结果，避免重复计算。</li>
      </ul>

      <p>闭包不是需要刻意「使用」的技巧，而是理解 JS 作用域后的自然结果。</p>
    `
  },
  {
    id: 'build-this-blog',
    title: '我为什么用纯 HTML + CSS + JS 搭建博客',
    date: '2026-09-20',
    tags: ['随笔', '博客'],
    excerpt: '没有框架、没有构建工具，只有三个原生文件。谈谈极简技术栈背后的取舍与乐趣。',
    content: `
      <p>这个博客本身，就是我对「技术选型」这件事的一次反思。</p>

      <h2>从过度设计回归本质</h2>
      <p>搭个人博客的第一反应往往是：上 Next.js 还是 Astro？要不要 Tailwind？数据放 Markdown 还是 Headless CMS？这些选择当然有它们的价值，但对一个「记录想法」的个人站点来说，它们大多是噪音。</p>

      <p>一个博客真正需要的能力其实很有限：展示文章列表、渲染一篇文章、一个好看的排版。原生 HTML、CSS、JavaScript 已经绰绰有余。</p>

      <h2>极简带来的好处</h2>
      <ul>
        <li><strong>零依赖：</strong>不用等 <code>npm install</code>，也没有供应链风险。</li>
        <li><strong>可持久：</strong>十年后这些文件照样能直接打开。</li>
        <li><strong>聚焦写作：</strong>把时间花在内容上，而不是折腾配置。</li>
        <li><strong>好理解：</strong>每一行代码都是自己写的，出问题一眼定位。</li>
      </ul>

      <h2>文章怎么组织</h2>
      <p>我把所有文章放在一个 <code>posts.js</code> 文件里，每篇是一个对象，包含标题、日期、标签和 HTML 正文。新增一篇文章，就是在数组里追加一个对象——仅此而已。</p>

      <blockquote>工具应当服务于表达，而不是反过来。当你发现自己在为工具而工作，也许该停下来想想：我要解决的问题到底是什么？</blockquote>

      <p>这大概就是这个小博客想传递的第一篇内容。</p>
    `
  }
];
