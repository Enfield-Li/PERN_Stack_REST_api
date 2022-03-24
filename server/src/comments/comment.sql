select comments.*, comments."replyToUserId", "user".username 
from comments join "user" on "user".id = comments."replyToUserId" 
where comments.id = 36;
