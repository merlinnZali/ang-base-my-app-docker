import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvironmentLoaderService } from "../config/environment-loader.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  
    constructor(private envService: EnvironmentLoaderService) {
       
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers;
        if(this.envService.get() != undefined && this.envService.get().clientId ){
            headers = headers.set('X-IBM-Client', this.envService.get().clientId)
        }
        // this.auth.getAuthorizationToken();
        const userToken = 'secure-user-token';
        headers = headers.set('Authorization', `Bearer ${userToken}`);

        if(headers.keys().length > 0){
            req = req.clone({
                headers
            })
        }
        return next.handle(req);
    }
}