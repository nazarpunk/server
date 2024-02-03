```sql


alter user 'root'@'localhost' identified with caching_sha2_password by 'kj9023bng6752bjw';
```

```sql

select user, host, plugin
from mysql.user;

revoke all privileges, grant option from 'user'@'localhost';

drop user 'user'@'localhost';
```
