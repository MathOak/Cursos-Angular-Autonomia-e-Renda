import { HttpInterceptorFn } from
 '@angular/common/http';
export const httpInterceptor: HttpInterceptorFn = 
(req, next) => {
console.log('Interceptando requisição:', req.url);
return next(req);
};
