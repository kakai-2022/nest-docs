import{_ as s,c as i,o as a,V as p}from"./chunks/framework.BbAbY5cn.js";const n="/assets/第45章-1.MiPXGFm0.png",t="/assets/第45章-2.w3s1Ku1E.png",l="/assets/第45章-3.BwnrzfeK.png",h="/assets/第45章-4.bCIqVGBi.png",k="/assets/第45章-5.r6u_NFth.png",e="/assets/第45章-6.jTG9ijgM.png",r="/assets/第45章-7.TNX6jHf4.png",E="/assets/第45章-8.GNFA13Df.png",d="/assets/第45章-9.oSIKDbK7.png",g="/assets/第45章-10.WFKar3K4.png",c="/assets/第45章-11.lD6d9sqA.png",y="/assets/第45章-12.Q1atxto-.png",o="/assets/第45章-13.fi1tu8JA.png",F="/assets/第45章-14.iu4GXyr6.png",u="/assets/第45章-15.HtIgn4J8.png",C="/assets/第45章-16.atmTSKCy.png",m="/assets/第45章-17.MY4yVXFy.png",_="/assets/第45章-18.TKhQ6-Jv.png",v="/assets/第45章-19.1t9GFk6j.png",D="/assets/第45章-20.Hv6JNJUG.png",A="/assets/第45章-21.ljrTTwKV.png",B="/assets/第45章-22.BzNNHMKN.png",b="/assets/第45章-23.I7zwiK2I.png",q="/assets/第45章-24.MZznSsrO.png",S="/assets/第45章-25.ittXBXXN.png",f="/assets/第45章-26.A1QZCAOZ.png",j="/assets/第45章-27.zaSvBuIN.png",w="/assets/第45章-28.8fJDDdvH.png",T="/assets/第45章-29.jQnPyRSR.png",I="/assets/第45章-30.klSVf5Fr.png",O="/assets/第45章-31.QLg0etBe.png",N="/assets/第45章-32.jqw4YNyn.png",U="/assets/第45章-33.qvGV1AOG.png",R="/assets/第45章-34.NpUhxK7b.png",K="/assets/第45章-35.7WQrzWD8.png",M="/assets/第45章-36.5VyOlDqv.png",P="/assets/第45章-37.SjvvOKsO.png",x="/assets/第45章-38.xKo9jKFW.png",G="/assets/第45章-39.US61yPKR.png",ss=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"第45章—TypeORM一对一的映射和关联CRUD.md","filePath":"第45章—TypeORM一对一的映射和关联CRUD.md"}'),J={name:"第45章—TypeORM一对一的映射和关联CRUD.md"},V=p('<p>在数据库里，表和表之间是存在关系的。</p><p>比如用户和身份证是一对一的关系，部门和员工是一对多的关系，文章和标签是多对多的关系。</p><p>我们是通过外键来存储这种关系的，多对多的话还要建立中间表。</p><p>TypeORM 是把表、字段、表和表的关系映射成 Entity 的 class、属性、Entity 之间的关系，那如何映射这种一对一、一对多、多对多的关系呢？</p><p>我们来试一下。</p><p>这次创建个新的 database 来用：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> database</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> typeorm_test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>执行它：</p><p><img src="'+n+'" alt=""></p><p>点击刷新，就可以看到这个新的 database 了：</p><p><img src="'+t+'" alt=""></p><p>我们用 typeorm 连上它来自动创建表。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npx typeorm@latest </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">init</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> --name typeorm-relation-mapping --database mysql</span></span></code></pre></div><p>创建个 typeorm 项目。</p><p><img src="'+l+`" alt=""></p><p>修改 DataSource 的配置：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;reflect-metadata&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { DataSource } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;typeorm&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { User } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./entity/User&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AppDataSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DataSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mysql&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    host: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;localhost&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    port: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3306</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    username: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    password: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;guang&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    database: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;typeorm_test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    synchronize: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    logging: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    entities: [User],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    migrations: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subscribers: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    poolSize: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    connectorPackage: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mysql2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    extra: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        authPlugin: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;sha256_password&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>安装驱动包 mysql2</p><pre><code>npm install --save mysql2
</code></pre><p>然后跑起来：</p><pre><code>npm run start
</code></pre><p>可以看到，它生成了建表 sql 和插入数据的 sql：</p><p><img src="`+h+'" alt=""></p><p>点击刷新，在 workbench 里也可以看到这个新建的表：</p><p><img src="'+k+'" alt=""></p><p>点击新建 sql，执行 select，也是可以看到插入的数据的：</p><p><img src="'+e+'" alt=""></p><p>然后我们再创建个身份证表。</p><p>通过 typeorm entity:create 命令创建：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npx typeorm entity:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">entity</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IdCard</span></span></code></pre></div><p><img src="'+r+'" alt=""></p><p><img src="'+E+`" alt=""></p><p>填入属性和映射信息：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Column, Entity, PrimaryGeneratedColumn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;typeorm&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;id_card&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IdCard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PrimaryGeneratedColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        length: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        comment: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;身份证号&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    cardName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在 DataSource 的 entities 里引入下：</p><p><img src="`+d+'" alt=""></p><p>重新 npm run start：</p><p><img src="'+g+'" alt=""></p><p>可以看到生成了这条建表 sql。</p><p>workbench 里也可以看到这个表：</p><p><img src="'+c+'" alt=""></p><p>现在 user 和 id_card 表都有了，怎么让它们建立一对一的关联呢？</p><p>先把这两个表删除：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">drop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id_card,user;</span></span></code></pre></div><p><img src="'+y+'" alt=""></p><p>在 IdCard 的 Entity 添加一个 user 列，指定它和 User 是 @OneToTone 一对一的关系。</p><p>还要指定 @JoinColum 也就是外键列在 IdCard 对应的表里维护：</p><p><img src="'+o+'" alt=""></p><p>重新 npm run start：</p><p><img src="'+F+'" alt=""></p><p>仔细看生成的这 3 条 sql 语句。</p><p>前两个是建表 sql，创建 id_card 和 user 表。</p><p>最后一个是给修改 id_card 表，给 user_id 列添加一个外建约束，引用 user 表的 id 列。</p><p>在 workbench 里看下：</p><p><img src="'+u+'" alt=""></p><p><img src="'+C+'" alt=""></p><p><img src="'+m+'" alt=""></p><p>生成的表都是对的。</p><p>但是这个级联关系还是默认的：</p><p><img src="'+_+'" alt=""></p><p>如果我们想设置 CASCADE 应该怎么做呢？</p><p>在第二个参数指定：</p><p><img src="'+v+'" alt="image.png"></p><p>删除这两个表：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">drop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id_card,user;</span></span></code></pre></div><p>重新 npm run start：</p><p><img src="'+D+'" alt=""></p><p><img src="'+A+`" alt=""></p><p>这样就设置了级联删除和级联更新。</p><p>我们再来试下增删改查：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { AppDataSource } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./data-source&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { IdCard } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./entity/IdCard&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { User } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;./entity/User&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">AppDataSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">initialize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user.firstName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;guang&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user.lastName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;guang&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user.age </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> idCard</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IdCard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    idCard.cardName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;1111111&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    idCard.user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(idCard);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">error</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(error))</span></span></code></pre></div><p>创建 user 和 idCard 对象，设置 idCard.user 为 user，也就是建立关联。</p><p>然后先保存 user，再保存 idCard。</p><p>跑 npm run start，生成的 sql 如下：</p><p><img src="`+B+'" alt=""></p><p>可以看到后面插入 id_card 的时候，已经有 userId 可以填入了。</p><p>数据都插入成功了：</p><p><img src="'+b+'" alt=""></p><p>但是我还要分别保存 user 和 idCard，能不能自动按照关联关系来保存呢？</p><p>可以的，在 @OneToOne 那里指定 cascade 为 true：</p><p><img src="'+q+'" alt=""></p><p>这个 cascade 不是数据库的那个级联，而是告诉 typeorm 当你增删改一个 Entity 的时候，是否级联增删改它关联的 Entity。</p><p>这样我们就不用自己保存 user 了：</p><p><img src="'+S+'" alt=""></p><p>重新 npm run start：</p><p><img src="'+f+'" alt=""></p><p>可以看到它同样是先插入了 user，再插入了 id_card，并且设置了正确的 userId。</p><p><img src="'+j+`" alt=""></p><p>保存了之后，怎么查出来呢？</p><p>我们用 find 来试下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ics);</span></span></code></pre></div><p>跑下 npm run start：</p><p><img src="`+w+`" alt=""></p><p>可以看到 idCard 查出来了，但是关联的 user 没查出来。</p><p>只需要声明下 relations 关联查询就好了：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    relations: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        user: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ics);</span></span></code></pre></div><p><img src="`+T+'" alt=""></p><p>再跑一下：</p><p><img src="'+I+`" alt=""></p><p>现在 idCard 关联的 user 就被查出来了。</p><p>当然，你也可以用 query builder 的方式来查询：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getRepository</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createQueryBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">leftJoinAndSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ic.user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;u&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMany</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ics);</span></span></code></pre></div><p>先 getRepository 拿到操作 IdCard 的 Repository 对象。</p><p>再创建 queryBuilder 来连接查询，给 idCard 起个别名 ic，然后连接的是 ic.user，起个别名为 u：</p><p><img src="`+O+`" alt=""></p><p>或者也可以直接用 EntityManager 创建 queryBuilder 来连接查询：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createQueryBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">leftJoinAndSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ic.user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;u&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMany</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ics);</span></span></code></pre></div><p><img src="`+N+'" alt=""></p><p>再来试下修改：</p><p>现在数据是这样的：</p><p><img src="'+U+'" alt=""></p><p><img src="'+R+`" alt=""></p><p>我们给它加上 id 再 save：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user.firstName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;guang1111&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user.lastName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;guang1111&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user.age </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> idCard</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IdCard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">idCard.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">idCard.cardName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;22222&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">idCard.user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(idCard);</span></span></code></pre></div><p>这样数据就被修改了：</p><p><img src="`+K+'" alt=""></p><p><img src="'+M+'" alt=""></p><p>看下生成的 sql：</p><p><img src="'+P+`" alt=""></p><p>在一个事务内，执行了两条 update 的 sql。</p><p>最后再试试删除。</p><p>因为设置了外键的 onDelete 是 cascade，所以只要删除了 user，那关联的 idCard 就会跟着被删除。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(User, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>如果不是没有这种级联删除，就需要手动删了：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> idCard</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">findOne</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    where: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    relations: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        user: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(User, idCard.user.id)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">delete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(IdCard, idCard.id)</span></span></code></pre></div><p>不过现在我们只是在 idCard 里访问 user，如果想在 user 里访问 idCard 呢？</p><p>同样需要加一个 @OneToOne 的装饰器：</p><p><img src="`+x+`" alt=""></p><p>不过需要有第二个参数。</p><p>因为如果是维持外键的那个表，也就是有 @JoinColumn 的那个 Entity，它是可以根据外键关联查到另一方的。</p><p>但是没有外键的表怎么查到另一方呢？</p><p>所以这里通过第二个参数告诉 typeorm，外键是另一个 Entity 的哪个属性。</p><p>我们查一下试试：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AppDataSource.manager.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(User, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    relations: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        idCard: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user);</span></span></code></pre></div><p>可以看到，同样关联查询成功了：</p><p><img src="`+G+'" alt=""></p><p>这就是一对一关系的映射和增删改查。</p><p>案例代码在<a href="https://github.com/QuarkGluonPlasma/nestjs-course-code/tree/main/typeorm-relation-mapping" target="_blank" rel="noreferrer">小册仓库</a>。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>TypeORM 里一对一关系的映射通过 @OneToOne 装饰器来声明，维持外键列的 Entity 添加 @JoinColumn 装饰器。</p><p>如果是非外键列的 Entity，想要关联查询另一个 Entity，则需要通过第二个参数指定外键列是另一个 Entity 的哪个属性。</p><p>可以通过 @OneToOne 装饰器的 onDelete、onUpdate 参数设置级联删除和更新的方式，比如 CASCADE、SET NULL 等。</p><p>还可以设置 cascade，也就是 save 的时候会自动级联相关 Entity 的 save。</p><p>增删改分别通过 save 和 delete 方法，查询可以通过 find 也可以通过 queryBuilder，不过要 find 的时候要指定 relations 才会关联查询。</p><p>这就是 TypeORM 里一对一的映射和增删改查，下节我们继续学习一对多的映射。</p>',145),z=[V];function Q(X,H,W,$,L,Z){return a(),i("div",null,z)}const is=s(J,[["render",Q]]);export{ss as __pageData,is as default};
