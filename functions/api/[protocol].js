// 配置订阅源地址
const baseUrl = 'https://your-subscription-source.com'

export async function onRequest({ params }) {
  const { protocol } = params

  // 根据协议类型转发请求
  switch (protocol.toLowerCase()) {
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