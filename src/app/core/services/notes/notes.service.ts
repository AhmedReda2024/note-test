import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpClient: HttpClient) {}

  addNewNote(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/notes`, data);
  }

  getUserNotes(): Observable<any> {
    return this.httpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`
    );
  }

  updateUserNotes(data: object, id: string): Observable<any> {
    return this.httpClient.put(
      `${environment.BASE_URL}/api/v1/notes/${id}`,
      data
    );
  }

  deleteUserNotes(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.BASE_URL}/api/v1/notes/${id}`);
  }
}
