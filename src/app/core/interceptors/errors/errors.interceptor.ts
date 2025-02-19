import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { NotesService } from '../../services/notes/notes.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const notesService = inject(NotesService);

  // logic of req

  return next(req).pipe(
    catchError((err) => {
      // logic errros

      console.log('errros from interceptroesss', err);

      if (err.error.msg !== 'not notes found') {
        toastrService.error(err.error.msg);
      }

      return throwError(() => err);
    })
  ); // logic res
};
