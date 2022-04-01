仿 Reddit 论坛 又一个全栈 web app (REST api + SPA)

作品描述：

    一个“缝合怪”论坛网站，功能仿照Reddit论坛、Youtube评论区样式

Stack：

    语言：Typescript；
    前端：Reactjs / React Context api (state管理) / Boostrap 5 (css)；
    API: REST api + Socket.IO；
    服务器：Nestjs / Express session + Redis-server (auth)；
    数据库：PostgreSQL / Prisma(ORM)。

    注：Nestjs 传说是nodejs版Spring框架，实现细节也是MVC那一套体系，特性：依赖注入容器 模块化封装 可测试性 内置支持TypeScript 可基于 Express 或者 fastify

现有功能：

    用户注册，登录（可通过用户名或邮箱），发布、删除、编辑帖子，给帖子投票、添加对帖子的反应，查看用户主页，加载更多分页，根据best, hot, new, top 四种类型筛选首页显示的帖子类型。

    功能细节：
        1. 用户注册及登录：
            完成注册或登录操作后，用户将获取cookie，保存其登录状态，并跳转至首页，首页显示用户过往与帖子的交互状态；

        2. 发布文章/帖子
            发布帖子时，将自我投票及点赞，并跳转至该帖子的详情页面，用户可以看到自己在发布帖子时，系统自动投票和添加的交互状态；

        3. 实时推送点赞及评论通知：
            整合socket.IO，用户对其他在线用户触发点赞等行为后，目标用户会收到相应的弹框提示相应信息；

        4. 首页pagination：
            筛选项 “best、hot、new” 使用基于cursor的分页，显示最近时间的帖子，用户向下滑动无限滑动加载更多帖子，默认10个；

            筛选项 “top” 使用基于offset的分页，子选项有“半年内、一年内、两年内”；

        5. 用户主页：
            显示用户过往发布的帖子，以及用户的帖子数量、用户注册日期，分页采用同样的cursor分页形式，也是显示最近时间帖子；

        7. 评论文章：
            用户可对文章进行评论，对其他用户的评论进行回复，以及对评论点赞的交互；

        8. 搜索文章：
            顶部搜索框，输入需要搜索的关键词，返还标题或内容相关的文章搜索结果。

如何使用？

    0. cd 进入文件
    1. npm i
    2. 再分别进入server 和 client:
        npm i
    3. cd server:
        1) 更改.env 文件， 使prisma和数据库建立连接
        2) npx prisma db push (将schema推到数据库)
        3) npx prisma generate (生成相应type definition)

    4. cd.. 回到主文件夹
    5. npm run dev
    6. enjoy :)

<a href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres">官方文档，用于连接数据库</a>
