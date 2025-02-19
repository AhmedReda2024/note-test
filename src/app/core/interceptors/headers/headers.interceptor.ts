import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const plat_id = inject(PLATFORM_ID);
  // logic req
  // token

  if (isPlatformBrowser(plat_id)) {
    if (localStorage.getItem('userToken') !== null) {
      // fe token already
      req = req.clone({
        setHeaders: {
          token: `3b8ny__${localStorage.getItem('userToken')!}`,
        },
      });
    }
  }

  return next(req); // logic res
};
