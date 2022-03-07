 仿Reddit的一个全栈 web app
    
    (https://www.reddit.com/)

作品描述：

    仿Reddit论坛PC端功能，搭建的一个论坛式网站

    前端框架：Nextjs / Apollo Client + Context api (state 管理) / Boostrap 5 (css);
    APi： GraphQL
    服务器：Express.JS / Express session (auth) / Apollo Server
    数据库：PostgreSQL / TypeORM

如何使用？

    1. npm i
    2. 分别进入server 和 client:
        npm i
    3. 更改连接数据库文件： /utils/connectdb.ts （我用的PostgreSQL)
    4. cd 回主文件
    5. npm run dev
    6. enjoy :)
