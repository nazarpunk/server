https://www.layerstack.com/resources/tutorials/How-to-upgrade-PHP-7.4-to-PHP-8.0-on-Ubuntu-20.04-with-Nginx
```shell
echo "List all install packages"
dpkg -l | grep php8.1
```

```shell
echo "Execute the following command to generate a list of corresponding"
dpkg -l | grep php8.1 | cut -f3 -d' ' | xargs | sed 's/8.1/8.3/g'
```

```shell
echo "add repository"
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
```

```shell
echo "update"
apt-get update
```

```shell
echo "simulate"
sudo apt --simulate   install php8.3-bz2 php8.3-cli php8.3-common php8.3-curl php8.3-dev php8.3-fpm php8.3-gd php8.3-intl php8.3-mbstring php8.3-mysql php8.3-opcache php8.3-readline php8.3-xml php8.3-zip
```

```shell
echo 'install'
sudo apt -y           install       php8.3-bz2 php8.3-cli php8.3-common php8.3-curl php8.3-dev php8.3-fpm php8.3-gd                 php8.3-intl php8.3-mbstring                 php8.3-mysql php8.3-opcache php8.3-readline php8.3-xml php8.3-zip
```
```shell
                            php8.3  php8.3-bz2 php8.3-cli php8.3-common php8.3-curl php8.3-dev php8.3-fpm php8.3-gd php8.3-imagick  php8.3-intl php8.3-mbstring php8.3-memcache php8.3-mysql php8.3-opcache php8.3-readline php8.3-xml php8.3-zip
```

```shell
echo 'switch'
update-alternatives --config php
```

```shell
sudo service nginx restart
sudo service php8.3-fpm  restart
```
