import fs from "fs";

for (const [file, query] of Object.entries({
    relay_domains: `select domain
                    from domain
                    where domain = '%s'
                      and backupmx = '1'`,
    sender_dependent_default_transport_maps: `select transport
                    from transport
                    where domain = '%d'
                      and status
                    order by rand()
                    limit 1`
})) {
    fs.writeFileSync(`${file}.cf`,
`hosts = 127.0.0.1:3306
user = root
password = kj9023bng6752bjw
dbname = postfix
query = ${query.replace(/\s\s+/g, ' ')}`, {flag: 'w+'});
}
