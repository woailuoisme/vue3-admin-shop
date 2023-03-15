#!/bin/bash

if [ ! -f /etc/nginx/ssl/default.crt ]; then
    #1 创建一个私钥
    openssl genrsa -out "/etc/nginx/ssl/default.key" 2048
    #2 生成 CSR 说明：需要依次输入国家，地区，城市，组织，组织单位，Common Name和Email。其中Common Name，
    # 可以写自己的名字或者域名，如果要支持https，Common Name应该与域名保持一致，否则会引起浏览器警告。
    # 可以将证书发送给证书颁发机构（CA），CA验证过请求者的身份之后，会出具签名证书，需要花钱。
    # 另外，如果只是内部或者测试需求，也可以使用OpenSSL实现自签名。
    openssl req -new -key "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.csr" -subj "/CN=default/O=default/C=UK"
    #3 如果不删除密码，在应用加载的时候会出现输入密码进行验证的情况，不方便自动化部署。
    openssl rsa -in "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.key"
    #4 生成 crt 自签名证书
    openssl x509 -req -days 365 -in "/etc/nginx/ssl/default.csr" -signkey "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.crt"
    #6 生成 PEM 格式的证书
    openssl x509 -in "/etc/nginx/ssl/default.crt" -out "/etc/nginx/ssl/default.pem" -outform PEM
    chmod 644 /etc/nginx/ssl/default.key
    chmod 644 /etc/nginx/ssl/default.pem
fi

# Start crond in background
crond -l 2 -b

# Start nginx in foreground
nginx