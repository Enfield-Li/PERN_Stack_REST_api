-- https://stackoverflow.com/questions/8779918/postgres-multiple-joins
select comments.*, comments."replyToUserId", comments."userId", "newuser".username as "toUsername"
from comments left join "user" as "newuser" on "newuser".id = comments."userId" 
where comments."postId" = 3983 and comments."parentCommentId" = 61;



select comments.*, comments."replyToUserId", comments."userId", "replyToUsername".username as "replyToUsername", "user".username  
from comments 
    join "user" as "replyToUsername" on "replyToUsername".id = comments."replyToUserId" 
    join "user" as "user" on "user".id = comments."userId"
where comments."postId" = 3983 and comments."parentCommentId" = 61;