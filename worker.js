const html = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colab路由地址</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                sans-serif;
            background-color: #1b1b1b;
            color: #ffffff;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #ffffff;
            text-align: center;
            margin-bottom: 30px;
        }

        .logo {
            color: #ffffff;
            background-color: #000000;
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
        }

        .logo span {
            color: #ff9000;
        }

        .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }

        button {
            margin: 5px;
            padding: 12px 24px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            background-color: #ff9000;
            color: #000000;
            cursor: pointer;
            transition: background-color 0.3s;
            font-weight: bold;
        }

        button:hover {
            background-color: #ff7000;
        }

        #message {
            display: none;
            color: #ff9000;
            font-size: 16px;
            padding: 10px;
            margin: 10px 0;
            background-color: #2a2a2a;
            border-radius: 4px;
            text-align: center;
        }

        textarea {
            width: 100%;
            height: 150px;
            resize: none;
            font-size: 16px;
            padding: 12px;
            border: 1px solid #333;
            border-radius: 6px;
            margin-top: 10px;
            background-color: #2a2a2a;
            color: #ffffff;
        }

        h3 {
            color: #ff9000;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>
            <div class="logo">Colab<span>Hub</span></div>
        </h1>
        <div class="button-group">
            <button onclick="copyAndRedirect('Shadowsocks')">Shadowsocks</button>
            <button onclick="copyAndRedirect('Singbox')">Singbox</button>
            <button onclick="copyAndRedirect('Clash')">Clash</button>
        </div>
        <p id="message">复制成功！即将跳转...</p>
        <h3>使用教程</h3>
        <textarea id="tutorial" placeholder="请点击上方的按钮查看不同路由地址，均为订阅链接。
------------------------------
最新版本的Singbox协议的节点已支持全平台的Singbox内核代理软件!!
------------------------------

Shadowsocks需要Nekobox、Nekoray使用；V2RayN也可以使用，使用时需要把电脑端的核心改为Singbox。"></textarea>
    </div>
    <script>
        async function copyAndRedirect(route) {
            const button = event.target;
            const originalText = button.textContent;
            button.disabled = true;
            button.style.opacity = "0.7";

            try {
                const link = window.location.origin + "/api/" + route.toLowerCase();
                await navigator.clipboard.writeText(link);

                const message = document.getElementById("message");
                message.style.display = "block";
                message.textContent = "复制成功！即将跳转...";

                setTimeout(() => {
                    window.location.href = link;
                }, 2000);
            } catch (error) {
                console.error("复制失败:", error);
                const message = document.getElementById("message");
                message.style.display = "block";
                message.style.color = "#ff4444";
                message.textContent = "复制失败，请手动复制链接";
            } finally {
                setTimeout(() => {
                    button.disabled = false;
                    button.style.opacity = "1";
                    button.textContent = originalText;
                }, 2000);
            }
        }

        const tutorial = document.getElementById("tutorial");
        tutorial.value = localStorage.getItem("userTutorial") || tutorial.placeholder;

        let saveTimeout;
        tutorial.addEventListener("input", () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                localStorage.setItem("userTutorial", tutorial.value);
            }, 500);
        });
    </script>
</body>
</html>`;

async function handleSubscription(type) {
    const baseUrl = 'https://colad.xyhk.us.kg';
    
    const headers = {
        'Content-Type': 'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
    };

    try {
        const response = await fetch(`${baseUrl}/api/${type}`);
        if (!response.ok) {
            throw new Error('Subscription fetch failed');
        }
        const content = await response.text();
        return new Response(content, { headers });
    } catch (error) {
        console.error('Subscription error:', error);
        return new Response('获取订阅失败，请稍后重试', { 
            status: 500,
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        });
    }
}

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // 处理API请求
    if (url.pathname.startsWith('/api/')) {
        const route = url.pathname.split('/')[2];
        return handleSubscription(route);
    }
    
    // 返回主页
    return new Response(html, {
        headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=600'
        },
    });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
}); 