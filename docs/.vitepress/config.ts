import { defineConfig } from 'vitepress'
const fs = require('fs');


const links: any[] = []

export default defineConfig({
    lastUpdated: true,
    lang: 'zh-CN',
    title: 'APIHut',
    description: 'APIHut 文档.',
    cleanUrls: 'without-subfolders',
    head: [
        ['meta', { name: 'theme-color', content: '#646cff' }]
    ],
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/apihutco' }
        ],
        outlineTitle: '大纲',
        lastUpdatedText: '最后更新于',
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        sidebar: [
            {
                text: '指引',
                items: [
                    { text: '状态码', link: '/guide/code' },
                    { text: '更新日志', link: '/guide/changelog' },
                    // {text:'从v1迁移',link:'/guide/migration'}
                ]
            },
            {
                text: '接口',
                items: [
                    { text: 'IP 定位', link: '/api/ip' },
                    { text: '哈希头像', link: '/api/avatar' },
                    {
                        text: '协议测试', items: [
                            { text: 'GET', link: '/api/protocol/get' },
                            { text: 'POST', link: '/api/protocol/post' },
                            { text: 'WebSocket', link: '/api/protocol/websocket' },
                        ]
                    },
                    // {text: '一句问候', link: '/api/greet'},
                    { text: '天气状况(实时)', link: '/api/weather_now' },
                    { text: '天气预报(3日)', link: '/api/weather_3day' },
                    { text: '地理位置信息', link: '/api/geo' }
                    ,]
            },
            {
                text: '关于',
                items: [
                    { text: '常见问题', link: '/about/faq' },
                    { text: '联系我们', link: '/about/contact' },
                    { text: '状态页', link: 'https://status.apihut.co' },
                ]
            },
            {
                text: '旗下',
                items: [
                    { text: '互传', link: 'https://drop.apihut.co' },
                ]
            },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023 Northes'
        },
        nav: [
            {
                text: '2.0',
                items: [
                    { text: '1.0', link: 'https://v1.docs.apihut.net' }
                ]
            }
        ]
    },
    async buildEnd(siteConfig) {
        // 配置网站基础路径
        const baseURL = 'https://docs.apihut.co';
        let siteMapStr = '';
        for (const page of siteConfig.pages) {
            siteMapStr += `${baseURL}/${page.replace(/md$/, 'html')}\n`;
        }
        // 生成文件
        try {
            fs.writeFileSync(`${siteConfig.outDir}/sitemap.txt`, siteMapStr);
        } catch (err) {
            console.log('create sitemap.txt failed!', err);
        }
    },
})
