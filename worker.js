// 配置订阅源地址
const baseUrl = 'https://your-subscription-source.com'

// 处理请求的主函数
async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  // 处理API路由
  if (path.startsWith('/api/')) {
    const protocol = path.split('/api/')[1]
    
    switch (protocol) {
      case 'shadowsocks':
        return fetch(`${baseUrl}/ss`)
      case 'singbox':
        return fetch(`${baseUrl}/sb`)
      case 'clash':
        return fetch(`${baseUrl}/clash`)
      default:
        return new Response('不支持的协议类型', { status: 400 })
    }
  }

  // 处理其他请求
  return fetch(request)
}

// 监听请求
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
}) 