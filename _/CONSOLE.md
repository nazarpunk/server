```shell
nginx -s reload
```

```shell
certbot delete

certbot certonly --nginx
```

```shell
sudo chown -R www-data: /var/www/postfixadmin

sudo chown -R opendkim:root /etc/postfix/dkim
```

```shell
systemctl restart php8.3-fpm.service
```

```shell
systemctl restart dovecot
```

https://routerus.com/set-up-an-email-server-with-postfixadmin/


```shell
chown -R vmail:vmail /mnt/mail
```
