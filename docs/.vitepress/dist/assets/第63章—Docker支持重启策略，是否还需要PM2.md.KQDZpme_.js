import{_ as s,c as p,o as a,V as t}from"./chunks/framework.BbAbY5cn.js";const i="/assets/第63章-1.L1HQth0J.png",e="/assets/第63章-2.KcYQ6mvw.png",n="/assets/第63章-3.tOz9rEmg.png",l="/assets/第63章-4.DPWJcnsJ.png",r="/assets/第63章-5.uB3xyzYM.png",o="/assets/第63章-6.ukiHYvDH.png",c="/assets/第63章-7.7_GtlMDj.png",h="/assets/第63章-8.62hkBPMI.png",k="/assets/第63章-9.O2TF8kbT.png",d="/assets/第63章-10.jrUVG1WN.png",g="/assets/第63章-11.g-U-gpT6.png",m="/assets/第63章-12.egokylAP.png",u="/assets/第63章-13.Ed9dnaAV.png",_="/assets/第63章-14.SWhUDyGt.png",E="/assets/第63章-15.lhVo7Xv4.png",y="/assets/第63章-16.JZPHMgi-.png",v="/assets/第63章-17.bZe7b7Aw.png",D="/assets/第63章-18.tfTgKxPa.png",b="/assets/第63章-19.xtxPLC-y.png",C="/assets/第63章-20.4LvJ_hDv.png",F="/assets/第63章-21.XDQauBiQ.png",P="/assets/第63章-22.2qnWregi.png",f="/assets/第63章-23.eJSNhKqD.png",M="/assets/第63章-24.sU40FXtS.png",K=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"第63章—Docker支持重启策略，是否还需要PM2.md","filePath":"第63章—Docker支持重启策略，是否还需要PM2.md"}'),A={name:"第63章—Docker支持重启策略，是否还需要PM2.md"},x=t('<p>前面我们学习了 Docker、Docker Compose，并在 Docker 容器里通过 pm2-runtime 来跑的 node 服务。</p><p>主要是用 pm2 可以在进程崩溃的时候重启进程的功能。</p><p>而其实这个功能 Docker 也是有的。</p><p>我们来试一下：</p><p><img src="'+i+`" alt=""></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;xxx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>1s 以后抛一个错误，进程会终止。</p><p><img src="`+e+`" alt=""></p><p>然后我们把它放到 Docker 容器里跑。</p><p>写个 dockerfile：</p><div class="language-docker vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node:18-alpine3.14</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ./index.js .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/app/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>然后构建成镜像：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build -t restart-test:first .</span></span></code></pre></div><p><img src="`+n+'" alt=""></p><p>在 docker desktop 里可以看到：</p><p><img src="'+l+'" alt=""></p><p>然后把它跑起来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run --name=restart-test-container restart-test:first</span></span></code></pre></div><p>可以看到，容器 1s 后就停掉了：</p><p><img src="'+r+'" alt=""></p><p>当进程退出的时候，容器也会停止。</p><p>docker run 的时候也可以指定重启策略：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d --restart=always --name=restart-test-container2 restart-test:first</span></span></code></pre></div><p>这次加上 -d 把它放到后台跑。</p><p>--restart 指定总是重启。</p><p>然后你在 docker desktop 里就可以看到它一直在 restart：</p><p><img src="'+o+'" alt=""></p><p>打印了很多次错误日志：</p><p><img src="'+c+'" alt=""></p><p>你可以点击停止，就不会再重启了：</p><p><img src="'+h+`" alt=""></p><p>这就是 docker 的自动重启功能。</p><p>前面说过，pm2 也可以自动重启。</p><p>我们试试：</p><p>新建个 222.Dockerfile:</p><div class="language-docker vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node:18-alpine3.14</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ./index.js .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm install -g pm2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pm2-runtime&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/app/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>然后 build 一下，生成镜像：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker build -t restart-test:second -f 222.Dockerfile .</span></span></code></pre></div><p><img src="`+k+'" alt=""></p><p><img src="'+d+'" alt=""></p><p>然后跑一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d --name=restart-test-container3 restart-test:second</span></span></code></pre></div><p><img src="'+g+'" alt=""></p><p>这时候你会发现容器一直是运行状态，但是内部的进程一直在重启：</p><p><img src="'+m+'" alt=""></p><p>也就是说，Docker 的自动重启功能和 PM2 的自动重启功能是重合的。</p><p>那还有必要用 PM2 么？</p><p>其实 PM2 诞生的时候是没有 Docker 这种容器技术的，那时候都是直接部署在机器上，这时候自然需要一个进程管理工具来做进程的重启、负载均衡等功能。这是 PM2 当年很流行的原因。</p><p>但后来有了 Docker，里面跑的进程崩溃之后，Docker 容器支持自动重启。</p><p>所以，大多数情况下，没必要再用 PM2 了。</p><p>而且如果你用了 K8S 这种容器编排工具，那更没必要用 PM2 了，直接让 K8S 去调度、重启容器就可以。</p><p>但也有另一种说法，Docker 重新跑容器的成本，是比容器内 PM2 重新跑进程的成本高的，所以用 PM2 来管理进程更好一点。</p><p>综上，有了 Docker 基本没大有必要用 PM2 了。但如果单独跑 Docker 容器，还是可以结合 pm2-runtime 来提高重启速度的。</p><p>然后我们继续来看 Docker 的重启策略：</p><p>默认是 no，也就是不自动重启。</p><p>我们测试了 always，是容器退出时总是重启。</p><p>其实还有 on-failure 和 unless-stopped 这两种：</p><p>on-failure 是只有在非正常退出的时候才重启，相比之下，always 不管是不是非正常退出都重启。</p><p>而且 on-failure 还可以指定最多重启几次，比如 on-failure:3 是最多重启三次。</p><p>我们试一下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d --restart=on-failure:2 --name=restart-test-container4 restart-test:first</span></span></code></pre></div><p><img src="'+u+'" alt=""></p><p>可以看到容器重启了 2 次，一共打印了 3 次错误就不再重启了：</p><p><img src="'+_+'" alt=""></p><p>再来试试 unless-stopped：</p><p>unless-stopped 是除非手动停止，否则总是会重启。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker run -d --restart=unless-stopped --name=restart-test-container5 restart-test:first</span></span></code></pre></div><p><img src="'+E+'" alt=""></p><p>可以看到容器一直在重启：</p><p><img src="'+y+'" alt=""></p><p>除非点击停止按钮，也就是执行 docker stop 才会停止：</p><p><img src="'+v+'" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker stop restart-test-container5</span></span></code></pre></div><p><img src="'+D+'" alt=""></p><p><img src="'+b+'" alt=""></p><p>那看起来和 always 也没啥区别呀，都是只有手动 stop 才能停止，否则一直重启。</p><p>还是有区别的，就是在 Docker Deamon 重启的时候。</p><p>现在 docker-test-container2 是用的 always 的重启策略，docker-test-container5 是用的 unless-stopped 的重启策略:</p><p><img src="'+C+'" alt=""></p><p>这俩容器都停掉了。</p><p>现在我们重启 Docker：</p><p><img src="'+F+'" alt="image.png"></p><p>他会重启跑 Docker Engine ，也就是 Docker Deamon 的后台进程。</p><p><img src="'+P+'" alt="image.png"></p><p>这时候你会发现，always 重启策略的容器又跑起来了，而 unless-stopped 的容器没有重启。这就是这俩的区别：</p><p><img src="'+f+'" alt="image.png"></p><p>Docker Compose 是用于同时跑多个 Docker 容器的，它自然也支持 restart 的配置：</p><p><img src="'+M+'" alt=""></p><p>案例代码在<a href="https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/docker-restart-test" target="_blank" rel="noreferrer">小册仓库</a>。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Docker 是支持自动重启的，可以在 docker run 的时候通过 --restart 指定重启策略，或者 Docker Compose 配置文件里配置 restart。</p><p>有 4 种重启策略：</p><ul><li>no: 容器退出不自动重启（默认值）</li><li>always：容器退出总是自动重启，除非 docker stop。</li><li>on-failure：容器非正常退出才自动重启，还可以指定重启次数，如 on-failure:5</li><li>unless-stopped：容器退出总是自动重启，除非 docker stop</li></ul><p>重启策略为 always 的容器在 Docker Deamon 重启的时候容器也会重启，而 unless-stopped 的不会。</p><p>其实我们用 PM2 也是主要用它进程崩溃的时候重启的功能，而在有了 Docker 之后，用它的必要性就不大了。</p><p>当然，进程重启的速度肯定是比容器重启的速度快一些的，如果只是 Docker 部署，可以结合 pm2-runtime 来做进程的重启。</p><p>绝大多数情况下，直接用 Docker 跑 node 脚本就行，不需要 PM2。</p>',97),B=[x];function q(w,T,S,j,O,R){return a(),p("div",null,B)}const V=s(A,[["render",q]]);export{K as __pageData,V as default};
