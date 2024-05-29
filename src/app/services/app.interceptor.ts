import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export function handleError(error: any) {
    console.error('❌ Error Interceptor = ', error)
    //create notify for error
    return throwError(error)
}

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    
    if(req.url.includes('/assets/')){
        return next(req)
    }

    let request = req.clone({
        url: '/api/' + req.url,
        //headers: req.headers.set('Authorization', `Bearer ${TOKEN}`)
    });

    return next(request).pipe(
        catchError((error) => handleError(error))
    )

    
  }