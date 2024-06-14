import { inject } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { JsonObject, ResultObject } from "./app.interceptor.interface";
import { NotificationService } from "../notification/notification.service";

function handleError(httpError: HttpErrorResponse, notification: NotificationService) {
    //error connect with backend
    if(httpError.message.includes('Http failure response for') && httpError.url){
        const url: string[] = httpError.url?.split('/api/')
        notification.open({
            title: `Error in Backend Server`,
            message: `this Url ${url[0]} is not valid for connect backend, verify that docker is running the container and that the ports are correct.`,
            clase: 'error'
        })
    }
    //express validators response when propety is wrong in request
    const errors: ResultObject[] = transformObjectToArray(httpError.error.errors) 
    if(errors.length){
        if(errors.length === 1){
            notification.open({
                title: `Error in ${errors[0].path} property`,
                message: `${errors[0].msg}`,
                clase: 'error'
            })
        } else {

            let stringError: string[] = []
            errors.forEach((err) => {
                stringError.push(
                    `<li class="flex space-x-3">
                    <span class="size-5 flex justify-center items-center rounded-full bg-red-600 text-red-100">

                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                  </span>
                  <span class="text-gray-600 dark:text-white">
                  ${err.path}
                  </span>
                  </li>`
                )
            })

            notification.open({
                title: `Error in this Request Properties`,
                messageHtml:  `<ul class="space-y-3 text-sm">${stringError.join('')}</ul>`,
                messageUseHtml: true,
                message: '',
                clase: 'error'
            })
        }

        const response = new HttpResponse({ body: { success: false }})
        return of( response )

    } else {
        //error http
        notification.open({
            title: 'Error en request to server',
            message: `${httpError.message}`,
            clase: 'alert'
        })
    }

    const response = new HttpResponse({ body: { success: false }})
    return of( response )
}

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const apiBaseUrl = localStorage.getItem('backend_url') || '';
    const notification = inject(NotificationService)
    
    if(req.url.includes('/assets/')){
        return next(req)
    }

    let request = req.clone({
        url: `${apiBaseUrl}/api${req.url}`,
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
           // 'Authorization': `Bearer ${token}`
        })
    });

    return next(request).pipe(
        catchError((error) => {
            return handleError(error, notification)
        })
    )
  }


function transformObjectToArray(obj: JsonObject): ResultObject[] {
    return Object.keys(obj).map(key => {
        const { type, value, msg, path, location } = obj[key];
        return { type, value, msg, path, location, key };
    });
}
