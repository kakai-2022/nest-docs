import{_ as s,c as p,o as t,V as i}from"./chunks/framework.BbAbY5cn.js";const a="/assets/第06章-1._KNLsGej.png",n="/assets/第06章-2.wj0z15oC.png",e="/assets/第06章-3.DhnDOam-.png",l="/assets/第06章-4.SYnBvGc4.png",o="/assets/第06章-5.2Rj-H1Fp.png",r="/assets/第06章-6.rbarfvb5.png",h="/assets/第06章-7.rOR7vHfX.png",c="/assets/第06章-8.S7DHsj2Y.png",k="/assets/第06章-9.r_E5NlHq.png",g="/assets/第06章-10.AbFbpjE5.png",d="/assets/第06章-11.8lLJJdsR.png",E="/assets/第06章-12.0jESRhsq.png",_="/assets/第06章-13.ocBh2_FY.png",m="/assets/第07章-9.TiMWilrw.png",u="/assets/第06章-15.9b4RSwBu.png",y="/assets/第06章-16.C7R9Fq9D.png",F="/assets/第06章-17.r0Azz-hj.png",C="/assets/第06章-18.obeY-ptd.png",b="/assets/第06章-19.L5wTdYh6.png",v="/assets/第06章-20.bYZLdYM3.png",q="/assets/第06章-21.qDO7WYHu.png",B="/assets/第06章-22.lyf3mXPx.png",f="/assets/第06章-23.LiqmMS9n.png",j="/assets/第06章-24.uFUKfYU0.png",S="/assets/第06章-25.YTZQQqbX.png",D="/assets/第06章-26.6I3W9OnK.png",T="/assets/第06章-27.BAGZ6CaO.png",w="/assets/第06章-28.9rh7bvFo.png",x="/assets/第06章-29.YmQd4vtL.png",Y="/assets/第06章-30.8wE9k9vs.png",A="/assets/第06章-31.nitN8cmy.png",N="/assets/第06章-32.oDQ_mO5I.png",O="/assets/第06章-33.WBvWO0rj.png",V="/assets/第06章-34.S4CfKx84.png",J=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"第06章—如何调试Nest项目.md","filePath":"第06章—如何调试Nest项目.md"}'),R={name:"第06章—如何调试Nest项目.md"},L=i('<p>不少同学都是用 console.log 调试的，哪怕工作很多年依然是这样，这样有个致命的缺点：</p><p>你只能看到某个点的变量值，而看不到代码的整个执行路线。</p><p>对于复杂的项目来说，会用断点调试是必须的，因为这样可以看到作用域、调用栈，也就是代码的执行路线，然后单步运行来看变量的变化。</p><p><img src="'+a+`" alt=""></p><p>所以这一节我们来学下如何调试 nest 项目。</p><p>首先，先看下 node 调试：</p><p>创建个项目：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>mkdir debug-test</span></span>
<span class="line"><span>cd debug-test</span></span>
<span class="line"><span>npm init -y</span></span></code></pre></div><p><img src="`+n+`" alt=""></p><p>添加 index.js</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> os</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;os&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> homedir</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">homedir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(homedir);</span></span></code></pre></div><p>通过 os 模块拿到了 home 目录的路径。</p><p>直接 node 执行会输出结果：</p><p><img src="`+e+'" alt=""></p><p>我们以调试模式跑起来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>node --inspect-brk index.js</span></span></code></pre></div><p><img src="'+l+'" alt=""></p><p>--inspect 是调试模式运行，而 --inspect-brk 还会在首行断住。</p><p>可以看到，它起了一个 ws 服务。</p><p>然后我们用调试客户端连上它，比如用 Chrome DevTools。</p><p>打开 <a href="chrome://inspect/" target="_blank" rel="noreferrer">chrome://inspect/</a>，可以看到可以调试的目标：</p><p><img src="'+o+'" alt=""></p><p>如果没有，就配置下 network target，加上 localhost:9229</p><p><img src="'+r+'" alt=""></p><p>点击 inspect 就可以看到调试界面了：</p><p><img src="'+h+'" alt=""></p><p>代码在首行断住了，右侧也可以看到作用域和调用栈。</p><p>可以单步调试：</p><p><img src="'+c+'" alt=""></p><p>nest 也是 node 项目，自然也是这样来调试的。</p><p>nest start 有个 --debug 的选项，</p><p><img src="'+k+'" alt=""></p><p>原理就是 node --inspect。</p><p>这时候 inspect 发现啥也没：</p><p><img src="'+g+'" alt=""></p><p>因为 --inspect 并不会和 --inspect-brk 一样在首行断住。</p><p>我们在 controller 里加个 debugger：</p><p><img src="'+d+'" alt=""></p><p>然后访问下 <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a></p><p>这时候你会发现代码在断点处断住了：</p><p><img src="'+E+'" alt=""></p><p>可以看到代码的整个执行路线：</p><p><img src="'+_+'" alt=""></p><p>这样，就可以调试 nest 项目了。</p><p>但是这样调试还是太麻烦，我们一般在 VSCode 里写代码，能不能直接在 VSCode 里边写代码边调试呢？</p><p>当然是可以的。</p><p>VSCode 也实现了 Debugger 的客户端。</p><p>点击调试面板的 create launch.json file，它会创建 .vscode/launch.json 的调试配置文件：</p><p><img src="'+m+'" alt=""></p><p><img src="'+u+'" alt=""></p><p>然后输入 node，快速创建一个 node 调试配置：</p><p><img src="'+y+'" alt=""></p><p>我们先调试下前面那个 index.js 文件：</p><p><img src="'+F+'" alt=""></p><p>stopOnEntry 是在首行断住，和 --inspect-brk 一样的效果。</p><p><img src="'+C+'" alt=""></p><p>这样，就可以在 vscode 里调试 node 代码了。</p><p>在 vscode 里调试代码，最爽的是可以边改代码边调试。</p><p>比如你调试的过程中修改了代码，然后点击重新调试，就可以马上看到改动之后的效果：</p><p><img src="'+b+'" alt=""></p><p>调试体验就很棒！</p><p>nest 自然也可以这样调试：</p><p>还是 nest start --debug 来启动 nest 服务：</p><p><img src="'+v+'" alt=""></p><p>添加一个 attach 类型的调试配置：</p><p><img src="'+q+'" alt=""></p><p><img src="'+B+'" alt=""></p><p>然后在 controller 里打个断点，访问 <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a></p><p><img src="'+f+'" alt=""></p><p>代码同样会在断点处断住。</p><p>这样就可以直接在 vscode 里打断点了。</p><p>不过如果是用 VSCode 调试，可以不用 nest start --debug，有更简便的方式：</p><p><img src="'+j+`" alt=""></p><p>创建 npm scripts 的调试配置：</p><p>（如果创建出的调试配置 type 是 pwa-node 也可以，和 node 类型差不多，据说 pwa-node 功能多一点）</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;request&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;launch&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;debug nest&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;runtimeExecutable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;args&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;run&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;start:dev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skipFiles&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&lt;node_internals&gt;/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;console&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;integratedTerminal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>和我们命令行执行 npm run start:dev 一样。</p><p><img src="`+S+'" alt=""></p><p>这里的 runtimeExecutable 代表执行什么命令，args 传参数。</p><p>要指定 console 为 integratedTerminal，也就是用 vscode 的内置终端来打印日志，不然默认会用 debug console 跑，那个没有颜色：</p><p><img src="'+D+'" alt=""></p><p>点击调试模式启动：</p><p><img src="'+T+'" alt=""></p><p>然后浏览器访问 <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a></p><p><img src="'+w+'" alt=""></p><p>代码同样会在断点处断住。</p><p>这是最方便的调试 nest 项目的方式。</p><p>最后，介绍几种断点的类型，也是挺常用的：</p><p>有的时候只想打印日志，不想断住，又不想加 console.log 污染代码，这时候可以用 logpoint：</p><p><img src="'+x+'" alt=""></p><p>右键选择 logpoint：</p><p><img src="'+Y+'" alt=""></p><p>输入打印的信息，变量用 {} 包裹。</p><p>代码执行到这里就会打印：</p><p><img src="'+A+'" alt=""></p><p>这样适合不需要断住，但想打印日志的情况。不用在代码里加 console.log。</p><p>再就是条件断点：</p><p><img src="'+N+'" alt=""></p><p><img src="'+O+'" alt=""></p><p>表达式成立才会断住。</p><p>再就是异常断点，可以在没有处理的异常处自动断住：</p><p><img src="'+V+'" alt=""></p><p>这些断点类型只要有个印象，用到的时候能想起来就行。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>复杂的代码需要用断点调试查看调用栈和作用域，也就是代码的执行路线，然后单步执行。</p><p>node 代码可以加上 --inspect 或者 --inspect-brk 启动调试 ws 服务，然后用 Chrome DevTools 或者 vscode debugger 连上来调试。</p><p>nest 项目的调试也是 node 调试，可以使用 nest start --debug 启动 ws 服务，然后在 vscode 里 attach 上来调试，也可以添加个调试配置来运行 npm run start:dev。</p><p>nest 项目最方便的调试方式还是在 VSCode 里添加 npm run start:dev 的调试配置。</p><p>此外，我们还理解了 logpoint、条件断点、异常断点等断点类型。</p><p>学会了 nest 项目的调试，就可以直接在代码里打断点了。</p>',110),P=[L];function H(W,I,K,Q,$,z){return t(),p("div",null,P)}const M=s(R,[["render",H]]);export{J as __pageData,M as default};
