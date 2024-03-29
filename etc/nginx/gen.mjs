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

    #SERVERS
}
`
/**
 *
 * @param {string} subdomain
 * @param {string} root
 * @returns {*}
 */
// language=Nginx Configuration
const subserver =
    (subdomain, root) => `
    # === ${subdomain}
    server {
        listen 80;
        server_name ${subdomain};
        return 301 https://$server_name$request_uri;
    }
    server {
        server_name ${subdomain};
        root ${root};
        include import/server.conf;
    }
`


/**
 *
 * @param {string} domain
 * @param {string} root
 * @param {string} ip
 * @returns {*}
 */
const server = (domain, root, ip) => {
    // language=Nginx Configuration
    const ipr = ip ? `
    server {
        listen 80;
        server_name ${ip};
        return 301 https://${domain}$request_uri;
    }
` : ''

    // language=Nginx Configuration
    return `
    # === ${domain}
    
    ${ipr}
    
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
    `;
}

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

for (const [domain, root, ip] of [
    ['on.chat', 'chat', '185.156.41.84'],
    ['venus.agency', 'venus', '185.156.43.82'],
    ['digitalinnovationgroup.llc', 'digital','185.156.43.108'],
    ['motorz.auction', 'motorz'],
    ['eastriderz.com', 'eastriderz'],
    ['drive.studio', 'drive'],
    ['technocore.systems', 'technocore/main'],
]) {
    s += server(domain, root, ip)
}

for (const [domain, target] of [
    ['eastriderz.team', 'eastriderz.com'],
    ['eastriderz.club', 'eastriderz.com'],
    ['eastriderz.store', 'eastriderz.com'],
]) {
    s += redirect(domain, target)
}

for (const [domain, root] of [
    ['phpmyadmin.technocore.systems', '/usr/share/phpmyadmin'],
    ['roundcube.technocore.systems', '/var/www/html/technocore/roundcube'],
    ['postfixadmin.technocore.systems', '/var/www/html/technocore/postfixadmin/public'],
]) {
    s += subserver(domain, root)
}

fs.writeFileSync('nginx.conf', base.replace('#SERVERS', s), {flag: 'w+'});
