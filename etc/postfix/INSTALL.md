https://easyengine.io/tutorials/mail/server/postfix-dovecot-ubuntu/

https://serveradmin.ru/nastrojka-postfix-dovecot-postfixadmin-roundcube-dkim-na-debian/

```shell
apt-get install postfix postfix-pcre postfix-mysql dovecot-core dovecot-imapd dovecot-pop3d dovecot-lmtpd dovecot-mysql mysql-server dovecot-sieve dovecot-managesieved
```

https://serverfault.com/questions/211631/sasl-login-authentication-failed-ugfzc3dvcmq6-find-the-username


```shell
postfix reload
```



https://www.tecmint.com/watch-or-monitor-linux-log-files-in-real-time/

```shell
postmap -q "Received: by on.chat (Postfix, from userid 33) id 88A464148; Thu, 1 Feb 2024 22:39:58 +0000 (UTC)" pcre:/etc/postfix/map/smtp_header_checks
```

```shell
tail -n10 -f var/log/mail.err
```

```shell
postmap hash:/etc/postfix/map/smtp_header_checks
postfix reload
```
