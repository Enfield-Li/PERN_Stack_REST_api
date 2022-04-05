<h1>仿Reddit论坛 一个全栈 web app (REST api + SPA)</h1>

    English description below ⏬⏬⏬

作品描述：

    一个“缝合怪”论坛网站，功能仿照Reddit论坛、Youtube评论区样式、Github反应贴纸。

Stacks：

    语言：Typescript；
    前端：Reactjs / React Context api (state管理) / Boostrap 5 (css)；
    API: REST api + Socket.IO；
    服务器：Nestjs / Express session + Redis-server (auth)；
    数据库：PostgreSQL / Prisma(ORM)。

    注：Nestjs 传说是Nodejs版Spring框架，实现细节也是MVC那一套体系，特性：依赖注入容器 模块化封装 可测试性 内置支持TypeScript 可基于 Express 或者 fastify

现有功能：

    用户注册，登录（可通过用户名或邮箱），发布、删除、编辑帖子，给帖子投票、添加对帖子的反应，查看用户主页，加载更多分页，根据best, hot, new, top 四种类型筛选首页显示的帖子类型。

    功能细节：
        1. 用户注册及登录：
            完成注册或登录操作后，用户将获取cookie，保存其登录状态，并跳转至首页，首页显示用户过往与帖子的交互状态；

        2. 发布文章/帖子:
            发布帖子时，将自我投票及点赞，并跳转至该帖子的详情页面，用户可以看到自己在发布帖子时，系统自动投票和添加的交互状态；

        3. 整合socket.IO，实时推送点赞及评论通知：
            用户登录后，将更新其登录状态及其socket id，用户对其他用户帖子点赞等正面操作后，若文章作者在线，作者将收到弹窗提示，点赞其文章的用户及文章本身信息；

        4. 首页pagination：
            筛选项 “best、hot、new” 使用基于cursor的分页，显示最近时间的帖子，用户向下滑动无限滑动加载更多帖子，默认10个；

            筛选项 “top” 使用基于offset的分页，子选项有“半年内、一年内、所有时间”；

        5. 用户主页：
            显示用户过往发布的帖子，以及用户的帖子数量、用户注册日期，分页采用同样的cursor分页形式，也是显示最近时间帖子；

        6. 评论文章：
            仿照Youtube的“两层”评论区样式，用户可对文章进行评论，对其他用户的评论进行回复，以及对评论点赞的交互；


        7. 搜索文章：
            顶部搜索框，输入需要搜索的关键词，返还标题或内容相关的文章搜索结果。

如何使用？

    1. cd 进入文件
        npm install
    2. 再分别进入server 和 client:
        npm install
    3. cd server:
        1) 更改.env 文件， 使prisma和数据库建立连接
        2) npx prisma db push (将schema推到数据库)
    4. 后台运行 redis-server
    5. cd.. 回到主文件夹
    6. npm run dev
    7. enjoy :)

<a href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres">官方文档，用于连接数据库</a>

<h1>A Reddit-mock full stack web app (REST api + SPA)</h1>

Description:

    A mock Reddit web app, with main features from Reddit, Youtube comment section, and Github reaction for comments.

Stacks:

    Language：Typescript;
    Frontend：Reactjs / React Context api (state management) / Boostrap 5 (css);
    API: REST api + Socket.IO;
    Server：Nestjs / Express session + Redis-server (auth);
    Database：PostgreSQL / Prisma(ORM).

    Ps: Nestjs is known for being a Spring framework in the Nodejs context, which employ the same MVC design pattern.

Features:

    User login, register, post CRUD, vote, add reactions to post, view user's profile page, post pagination, filter and display posts according to "best, hot, new, top" criteria.

    Details:
    1. User register and login:
        After registration or login, user will get a cookie for persisting the login state, and will be redirected to the home page, where the user's past interactions with posts will be displayed;

    2. Create post:
        Upon post creation, a upvote and a like will be made to the post, and user will be redirected to the post detail page, where user can see the interactions state that system automatically added for them;

    3. Integrate Socket.IO, real time push notification for user interactions:
        After user login, it's online status and socket id will be kept, and when user perform a positive action, like an upvote, the post's author, if online as well, will be receiving a notification showing the user who voted and the post's info;

    4. Pagination:
        Filter criteria "best, hot, new" utilize cursor based pagination, showing latest posts, user can scroll infinitly to load more, 10 at a time;

        Filter criteria "top" with half-year, one-years, all-time options, utilize off-set based pagination;

    5. User's profile page:
        Showing user's paginated posts, user's post amount, register data. Pagination is cursor based, showing the latest posts as well;

    6. Comment post:
        Mimic Youtube's comment section with two layers deep. User can create comment for post, reply to comment, perform upvote, downvote.

    7. Search post:
        There's a search area on the navbar where user can perform full-text search for post, and get 5 posts info that matches the keyword;

How to use?

    1. cd enter to main
        npm install
    2. enter server and client folder respectively:
        npm install
    3. cd server:
        1) change .env and establish connection between Prisma and db
        2) npx prisma db push (push schema to db)
    4. run redis-server in the background
    5. cd.. back to main
    6. npm run dev
    7. enjoy :)

<a href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres">Docs for connecting to db</a>
