 仿Reddit的一个全栈 web app (REST api + SPA)
    
    (reddit 官网: https://www.reddit.com/) 

作品描述：

    仿Reddit论坛PC端功能，搭建的一个论坛式网站

    前端：Reactjs / Context api (缓存管理) / Boostrap 5;
    API: REST api
    服务器： Nestjs / Express session + redis-server (auth) 
    数据库：PostgreSQL / Prisma
    
现有功能： 
    
    用户注册，登录（可通过用户名或邮箱），发布、删除、编辑帖子，给帖子投票、添加对帖子的反应，查看用户主页，加载更多分页，根据best, hot, new 三种类型筛选首页显示的帖子类型。

    功能细节：
        1. 用户注册及登录：完成注册或登录操作后，用户将获取cookie，保存其登录状态，并跳转至首页，首页显示用户过往与帖子的交互状态；
        2. 发布帖子：发布帖子时，将自我投票及点赞，并跳转至该帖子的详情页面，用户可以看到自己在发布帖子时，系统自动投票和添加的交互状态；
        3. 编辑帖子：编辑好后，自动跳转至该帖子详情页面；
        4. 首页pagination：使用基于cursor的分页，显示最近时间的帖子，用户向下滑动、点击加载更多按钮可显示更多帖子，默认10个；
        5. 用户主页：显示用户过往发布的帖子，以及用户的帖子数量、用户注册日期，分页采用同样的cursor分页形式，也是显示最近时间帖子；
        6. 用户发布对帖子的评论等其他功能 Working in progress...
        
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
