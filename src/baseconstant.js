// export const BASE_URL = 'http://127.0.0.1:8000'
export const BASE_URL = 'https://testapi.ecstasynigeria.com'
// https://api.ecstasynigeria.com/api/v1
// server {
//         server_name ecstasynigeria.com www.ecstasynigeria.com;
//         listen 80;
 
//         error_page 404 /index.html;
//         location ~ ^/(api|images)/ {
//          proxy_pass http://localhost:3000;
//          proxy_http_version 1.1;
//         }
//         location / {
//          alias /home/frontend-app/dist/; 
//         }
// }


// server {
//     listen 80 default_server;
//     listen [::]:80 default_server;
//     root /var/www/admin/dist;
//     index index.html index.htm;
//     server_name admin.ecstasynigeria.com www.admin.ecstasynigeria.com;

//     location / {
//         try_files $uri $uri/ /index.html;
//     }

//     if ($http_x_forwarded_proto = "http") {
//         return 301   https://$host$request_uri;
//     }
// }
