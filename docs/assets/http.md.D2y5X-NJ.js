import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.DZjeu1b3.js";const g=JSON.parse('{"title":"HTTP","description":"","frontmatter":{},"headers":[],"relativePath":"http.md","filePath":"http.md","lastUpdated":1711902399000}'),t={name:"http.md"},n=e(`<h1 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-label="Permalink to &quot;HTTP&quot;">​</a></h1><p><strong>用途</strong>：处理基于HTTP协议的请求和响应。</p><p><strong>工作原理</strong>：监听指定的HTTP端口，并根据接收到的请求执行相应的操作，然后返回相应的HTTP响应。</p><p><strong>示例应用场景</strong>：Web应用程序、API服务等。</p><h2 id="路由定义" tabindex="-1">路由定义 <a class="header-anchor" href="#路由定义" aria-label="Permalink to &quot;路由定义&quot;">​</a></h2><p><code>HTTP</code>的路由定义非常简单，大家可以直接参考<code>internal/server/http.go</code>中的<code>NewHTTPServer</code>方法。</p><p>在<code>NewHTTPServer</code>方法中，我们首先创建了一个<code>gin.Engine</code>对象，然后定义了路由规则，包括<code>GET</code>、<code>POST</code>、<code>PUT</code>、<code>DELETE</code>等方法。</p><p>需要注意的是在<code>高级Layout</code>示例中，我们为大家定义了三个路由组，<code>noAuthRouter</code>、<code>noStrictAuthRouter</code>和<code>strictAuthRouter</code>，他们的具体用法如下：</p><ol><li><code>noAuthRouter</code>：无需认证即可访问，用于一些无需认证的接口，例如登录、注册等。</li><li><code>noStrictAuthRouter</code>：无需严格认证即可访问，用于一些无需严格认证的接口，例如获取用户信息等。</li><li><code>strictAuthRouter</code>：需要严格认证即可访问，用于一些需要严格认证的接口，例如修改用户信息等。</li></ol><p>三个路由组是基于不同的中间件实现的，具体中间件的实现可以参考<code>internal/middleware</code>目录下的代码。</p><h2 id="依赖注入handler" tabindex="-1">依赖注入Handler <a class="header-anchor" href="#依赖注入handler" aria-label="Permalink to &quot;依赖注入Handler&quot;">​</a></h2><p><code>HTTP</code>模块的依赖注入非常简单，只需要在<code>NewHTTPServer</code>方法中传入的用到的<code>Handler</code>结构即可。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NewHTTPServer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	logger</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Logger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	jwt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">jwt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">JWT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	userHandler</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UserHandler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// 更多handler</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,13),h=[n];function l(p,d,r,k,o,c){return a(),i("div",null,h)}const y=s(t,[["render",l]]);export{g as __pageData,y as default};