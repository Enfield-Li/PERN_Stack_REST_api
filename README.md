 仿Reddit的一个全栈 web app (REST api + SPA)
    
    (reddit 官网: https://www.reddit.com/) 

作品描述：

    仿Reddit论坛PC端功能，搭建的一个论坛式网站

    前端：Reactjs / Context api (缓存管理) / Boostrap 5 (css);
    API: REST api
    服务器： Express.JS / Express session (auth) / Nestjs
    数据库：PostgreSQL / Prisma

如何使用？

    0. cd 进入文件
    1. npm i
    2. 再分别进入server 和 client:
        npm i
    3. cd server:
        1) 更改.env 文件， 使prisma和数据库建立连接 
  <a href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres">官方文档，用于连接数据库</a>
        
        2) npx prisma db push (将schema推到数据库)
        3) npx prisma generate (生成相应type definition)
        
    4. cd.. 回到主文件夹
    5. npm run dev
    6. enjoy :)
