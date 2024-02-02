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
                                              limit 1`,
    virtual_alias_domain_maps: `select goto
                                from alias,
                                     alias_domain
                                where alias_domain.alias_domain = '%d'
                                  and alias.address = concat('%u', '@', alias_domain.target_domain)
                                  and alias.active = 1`,
    virtual_alias_maps: `select goto
                         from alias
                         where address = '%s'
                           and active = '1'`,
    virtual_mailbox_domains: `select domain
                              from domain
                              where domain = '%s'
                                and backupmx = '0'
                                and active = '1'`,
    virtual_mailbox_maps: `select maildir from mailbox where username='%s' and active = '1'`
})) {
    fs.writeFileSync(`${file}.cf`,
        `hosts = 127.0.0.1:3306
user = root
password = kj9023bng6752bjw
dbname = postfix
query = ${query.replace(/\s\s+/g, ' ')}`, {flag: 'w+'});
}
