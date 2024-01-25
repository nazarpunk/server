import fs from "fs";

// language=Nginx Configuration
const base = `user www-data;
worker_processes auto;
error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log combined;
    error_log /var/log/nginx/error.log;

    sendfile on;
    
    # === phpmyadmin
    server {
        listen 80;
        server_name php.on.chat;
        return 301 https://$server_name$request_uri;
    }
    server {
        server_name php.on.chat;
        root /usr/share/phpmyadmin;
        include import/server.conf;
    }
 
    #SERVERS
}
`

/**
 *
 * @param {string} domain
 * @param {string} root
 * @returns {*}
 */
// language=Nginx Configuration
const server =
    (domain, root) => `
    # === ${domain}
    server {
        listen 80;
        server_name ${domain} www.${domain};
        return 301 https://$server_name$request_uri;
    }
    
    server {
        server_name ${domain} www.${domain};
        root /var/www/html/${root};
        include import/server.conf;
    }
`

/**
 * @param {string} domain
 * @param {string} target
 * @returns {string}
 */
// language=Nginx Configuration
const redirect = (domain, target) => `
    # === ${domain} -> ${target}
    server {
        listen 80;
        server_name ${domain} www.${domain};
        return 301 https://${target}$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        server_name ${domain} www.${domain};
        return 301 https://${target}$request_uri;
    }
`

// ===
let s = '';


/*
drive.studio
*/

for (const [domain, root] of [
    ['on.chat', 'chat'],
    ['venus.agency', 'venus'],
    ['digitalinnovationgroup.llc', 'digital'],
    ['motorz.auction', 'motorz'],
    ['eastriderz.com', 'eastriderz'],
]) {
    s += server(domain, root)
}

for (const [domain, target] of [
    ['eastriderz.team', 'eastriderz.com'],
    ['eastriderz.club', 'eastriderz.com'],
    ['eastriderz.store', 'eastriderz.com'],
]) {
    s += redirect(domain, target)
}

fs.writeFileSync('nginx.conf', base.replace('#SERVERS', s), {flag: 'w+'});
