/* ================= 主题切换 ================= */
function initTheme() {
  const saved = localStorage.getItem('blog-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleIcon();
}

function updateToggleIcon() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggle.textContent = isDark ? '☀️' : '🌙';
}

function setupThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('blog-theme', next);
    updateToggleIcon();
  });
}

/* ================= 工具函数 ================= */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y} 年 ${m} 月 ${day} 日`;
}

function readingTime(content) {
  const text = content.replace(/<[^>]*>/g, '');
  return `${Math.max(1, Math.round(text.length / 400))} 分钟`;
}

/* ================= 首页：文章列表 ================= */
function renderPostList(postsToShow) {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  if (postsToShow.length === 0) {
    grid.innerHTML = '<p class="empty">没有找到相关文章。</p>';
    return;
  }

  grid.innerHTML = postsToShow.map(post => `
    <a class="post-card" href="post.html?id=${encodeURIComponent(post.id)}">
      <div class="post-card-meta">
        <time>${formatDate(post.date)}</time>
        <span>·</span>
        <span>${readingTime(post.content)}</span>
      </div>
      <h2 class="post-card-title">${escapeHtml(post.title)}</h2>
      <p class="post-card-excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="tags">
        ${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </a>
  `).join('');
}

function renderTags() {
  const tagBar = document.getElementById('tag-bar');
  if (!tagBar) return;

  const tags = ['全部', ...new Set(posts.flatMap(p => p.tags))];
  tagBar.innerHTML = tags
    .map(t => `<button class="tag-btn${t === '全部' ? ' active' : ''}" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`)
    .join('');
}

/* 搜索 + 标签筛选的合并状态 */
const filterState = { query: '', tag: '全部' };

function applyFilter() {
  const filtered = posts.filter(p => {
    const matchQuery =
      !filterState.query ||
      (p.title + ' ' + p.excerpt + ' ' + p.tags.join(' '))
        .toLowerCase()
        .includes(filterState.query);
    const matchTag = filterState.tag === '全部' || p.tags.includes(filterState.tag);
    return matchQuery && matchTag;
  });
  renderPostList(filtered);
}

function setupSearchAndTags() {
  const searchInput = document.getElementById('search-input');
  const tagBar = document.getElementById('tag-bar');
  if (!searchInput && !tagBar) return;

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      filterState.query = e.target.value.trim().toLowerCase();
      applyFilter();
    });
  }

  if (tagBar) {
    tagBar.addEventListener('click', e => {
      const btn = e.target.closest('.tag-btn');
      if (!btn) return;
      filterState.tag = btn.dataset.tag;
      tagBar.querySelectorAll('.tag-btn').forEach(b =>
        b.classList.toggle('active', b === btn));
      applyFilter();
    });
  }
}

/* ================= 详情页：渲染文章 ================= */
function renderPostDetail() {
  const container = document.getElementById('post-content');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const post = posts.find(p => p.id === id);

  if (!post) {
    container.innerHTML = `
      <div class="not-found">
        <h1>文章不存在</h1>
        <a href="index.html">← 返回首页</a>
      </div>`;
    document.title = '文章不存在 · 我的技术博客';
    return;
  }

  document.title = `${post.title} · 我的技术博客`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-meta').innerHTML =
    `<time>${formatDate(post.date)}</time><span>·</span><span>${readingTime(post.content)}</span>`;
  document.getElementById('post-tags').innerHTML =
    post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  document.getElementById('post-body').innerHTML = post.content;
}

/* ================= 初始化 ================= */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupThemeToggle();
  renderPostDetail();
  renderTags();
  renderPostList(posts);
  setupSearchAndTags();
});
