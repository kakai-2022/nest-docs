import{_ as p,c as s,o as e,V as t}from"./chunks/framework.BbAbY5cn.js";const r="/assets/第30章-1.-3TmQkRt.png",o="/assets/第30章-2.efy0Rig9.png",c="/assets/第30章-3.QzlkZZzo.png",i="/assets/第30章-4.npxQXhTM.png",n="/assets/第30章-5.9eWVYTX6.png",a="/assets/第30章-6.vRaN868G.png",l="/assets/第30章-7.1OCelVlB.png",_="/assets/第30章-8.DVqk-PtC.png",m="/assets/第30章-9.MlYBlaDy.png",d="/assets/第30章-10.eIYjoAmD.png",g="/assets/第30章-11.v5B0b28g.png",k="/assets/第30章-12.NtWssRLu.png",f="/assets/第30章-13.kForSSIZ.png",u="/assets/第30章-14.f5zPg1_W.png",h="/assets/第30章-15.Lfrcd2c-.png",O="/assets/第30章-16.iFI7MuGY.png",R="/assets/第30章-17.z5xUIkl_.png",D="/assets/第30章-18.eEI9ylaw.png",P="/assets/第30章-19.fHpo9eKF.png",M="/assets/第30章-20.UBG4aSZo.png",b="/assets/第30章-21.16UrZokl.png",E="/assets/第30章-22.h1nSidNO.png",y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"第30章—你的第一个Dockerfile.md","filePath":"第30章—你的第一个Dockerfile.md"}'),v={name:"第30章—你的第一个Dockerfile.md"},C=t(`<p>上节我们通过 desktop 从 docker hub 拉取了 nginx 的镜像，并把它跑了起来。</p><p>跑这个镜像的时候指定了映射的端口、挂载的数据卷、环境变量等。</p><p>跑起来的容器就已经有可用的 nginx 服务了。</p><p>那如果我们要自己制作一个这样的镜像，怎么做呢？</p><p>docker 容器内就是一个独立的系统环境，想想如果在这样一个系统上，要安装 nginx 服务，怎么做呢？</p><p>需要执行一些命令、复制一些文件进来，然后启动服务。</p><p>制作镜像自然也要进行这样的过程，不过可以自动化。</p><p>只要在 dockerfile 里声明要做哪些事情，docker build 的时候就会根据这个 dockerfile 来自动化构建出一个镜像来。</p><p>比如这样：</p><pre><code>FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD [&quot;http-server&quot;, &quot;-p&quot;, &quot;8080&quot;]
</code></pre><p>这些指令的含义如下：</p><ul><li>FROM：基于一个基础镜像来修改</li><li>WORKDIR：指定当前工作目录</li><li>COPY：把容器外的内容复制到容器内</li><li>EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080</li><li>RUN：在容器内执行命令</li><li>CMD：容器启动的时候执行的命令</li></ul><p>我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。</p><p>通过 WORKDIR 指定当前目录。</p><p>然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录</p><p>之后通过 RUN 执行 npm install，全局安装 http-server</p><p>通过 EXPOSE 指定要暴露的端口</p><p>CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。</p><p>把这个文件保存为 Dockerfile，然后在同级添加一个 index.html</p><p><img src="`+r+`" alt=""></p><p>然后通过 docker build 就可以根据这个 dockerfile 来生成镜像。</p><pre><code>docker build -t aaa:ccc .
</code></pre><p>aaa 是镜像名，ccc 是镜像的标签</p><p><img src="`+o+'" alt=""></p><p>FROM 是继承一个基础镜像，看输出也可以看出来，前面都是 node 镜像的内容，会一层层下载下来。</p><p>最后才是本地的我们添加的那些。</p><p>这时你在 desktop 的 images 列表里就可以看到这个镜像了：</p><p><img src="'+c+'" alt=""></p><p>然后执行 docker run 把这个镜像跑起来，用 desktop 我们就直接点击 run 按钮了：</p><p><img src="'+i+'" alt=""></p><p>会让你输入这些内容：</p><p><img src="'+n+'" alt=""></p><p>是不是上节用 nginx 镜像的感觉回来了？这次是我们自己 build 的镜像。</p><p>指定容器名、映射的端口、点击 run：</p><p><img src="'+a+'" alt=""></p><p>然后可以看到容器内的日志，服务启动成功了：</p><p><img src="'+l+'" alt=""></p><p>当然，容器内打印的是 8080 端口，但在容器外要用映射的 8888 端口访问：</p><p>访问 <a href="http://localhost:8888" target="_blank" rel="noreferrer">http://localhost:8888</a> 就可以看到我们在 html 写的内容了：</p><p><img src="'+_+'" alt=""></p><p>在容器内页打印了一条访问日志：</p><p><img src="'+m+'" alt=""></p><p>至此，我们写的第一个 dockerfile 和 build 出的第一个镜像就跑成功了！</p><p>我们在 files 里看看 /app 下是啥内容：</p><p><img src="'+d+'" alt=""></p><p>双击 index.html，可以看到这就是我们 build 镜像的时候 COPY 进去的文件。</p><p>但是我们想修改静态文件怎么办呢？</p><p>进入容器内改太麻烦，不如把这个 /app 目录设置为挂载点吧。</p><p>这样改下 Dockerfile：</p><p><img src="'+g+`" alt=""></p><p>然后重新 build 出一个镜像来：</p><pre><code>docker build -t aaa:ddd -f 2.Dockerfile .
</code></pre><p>因为现在不是默认的 Dockerfile 了，需要用 -f 指定下 dockefile 的文件名。</p><p><img src="`+k+'" alt=""></p><p>构建完之后再 run 一下这个新镜像：</p><p><img src="'+f+'" alt=""></p><p>这次我把我的桌面目录作为数据卷挂载到 /app 目录了：</p><p><img src="'+u+'" alt=""></p><p><img src="'+h+'" alt=""></p><p>容器跑起来后可以看到确实挂载上去了，也标识为了 mount：</p><p><img src="'+O+'" alt=""></p><p>浏览器访问下：</p><p><img src="'+R+'" alt=""></p><p>在 inspect 这里也可以看到挂载的目录：</p><p><img src="'+D+'" alt=""></p><p>有同学说，就算不在 dockerfile 里指定 VOLUME，我还是可以 docker run 的时候通过 -v 挂载数据卷呀。</p><p>那我为啥还要指定 VOLUME？</p><p>在 dockerfile 里指定 VOLUME 之后，如果你 docker run 的时候没有带 -v，那会放在一个临时的目录里。</p><p>比如我直接点击 run，不设置参数：</p><p><img src="'+P+'" alt=""></p><p>docker 会随机给他生成一个名字。</p><p>还会随机生成一个目录作为数据卷挂载上去：</p><p><img src="'+M+'" alt=""></p><p>inspect 可以看到这时候的路径是一个临时的目录：</p><p><img src="'+b+'" alt=""></p><p>这样就算你删了容器，数据也可以在这里找回。</p><p>设想下，如果你跑了个 mysql 容器，存了很多数据，但是跑容器的时候没指定数据卷。有一天，你把容器删了，所有数据都没了，可不可怕？</p><p>为了避免这种情况，mysql 的 dockerfile 里是必须声明 volume 的，这样就算你没通过 -v 指定数据卷，将来也可以找回数据。</p><p>在镜像详情可以看到 mysql 的 dockerfile，确实声明了 volume</p><p><img src="'+E+'" alt=""></p><p>这样就能保证数据不丢失。</p><p>dockerfile 在<a href="https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/docker-test" target="_blank" rel="noreferrer">小册仓库</a>。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>docker 镜像是通过 dockerfile 构建出来的。</p><p>我们写了第一个 dockerfile，通过 FROM、WORKDIR、COPY、RUN、EXPOSE、CMD 等指令声明了一个 http-server 提供静态服务的镜像。</p><p>docker run 这个镜像就可以生成容器，指定映射的端口、挂载的数据卷、环境变量等。</p><p>VOLUME 指令看起来没啥用，但能保证你容器内某个目录下的数据一定会被持久化，能保证没挂载数据卷的时候，数据不丢失。</p><p>写完这个 dockerfile，相信你会对 docker 镜像、容器有更具体的理解了。</p>',88),S=[C];function q(x,U,I,N,V,T){return e(),s("div",null,S)}const F=p(v,[["render",q]]);export{y as __pageData,F as default};
