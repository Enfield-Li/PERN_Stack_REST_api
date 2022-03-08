 仿Reddit的一个全栈 web app (REST api + SPA)
    
    (reddit 官网: https://www.reddit.com/) 

作品描述：

    仿Reddit论坛PC端功能，搭建的一个论坛式网站

    前端：Reactjs / Context api (缓存管理) / Boostrap 5 (css);
    API: REST api
    服务器： Express.JS / Express session (auth) / Nestjs
    数据库：PostgreSQL / Prisma

如何使用？

    1. npm i
    2. 分别进入server 和 client:
        npm i
    3. 更改连接数据库文件： /utils/connectdb.ts （我用的PostgreSQL，另外后台还要运行redis-server)
    4. cd.. 回到主文件夹
    5. npm run dev
    6. enjoy :)
