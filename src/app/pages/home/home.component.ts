import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { INotes } from '../../shared/interfaces/inotes';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  private readonly toastrService = inject(ToastrService);
  private readonly plat_id = inject(PLATFORM_ID);

  NotesData: INotes[] = [];

  noteId: string = '';

  @ViewChild('updateModel') myEle!: ElementRef;

  addForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  updateForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.getAllUserNotes();
      }
    }
  }

  getAllUserNotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res.notes);
        this.NotesData = res.notes;
      },
      error: (err) => {
        this.toastrService.clear();
        if (err.error.msg === 'not notes found') {
          this.NotesData = [];
        }
      },
    });
  }

  submitAddForm(): void {
    this.notesService.addNewNote(this.addForm.value).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          console.log(res);
          this.addForm.reset();
          this.getAllUserNotes(); // to display when add
          this.toastrService.success(res.msg, 'GoodNotes');
        }
      },
    });
  }

  showModel(): void {
    const model = this.myEle.nativeElement as HTMLElement;

    model.classList.remove('d-none');
  }

  hideModel(): void {
    const model = this.myEle.nativeElement as HTMLElement;

    model.classList.add('d-none');
  }

  @HostListener('document:click', ['$event']) onClick(e: PointerEvent) {
    if (e.target === this.myEle.nativeElement) {
      this.hideModel();
    }
  }

  setFormData(note: any, id: string): void {
    this.noteId = id;

    this.updateForm.patchValue({
      title: note.title,
      content: note.content,
    });
  }

  SubmitUpdateForm(): void {
    this.notesService
      .updateUserNotes(this.updateForm.value, this.noteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateForm.reset(); // reset form
          this.hideModel();
          this.getAllUserNotes(); // to display data after data
        },
      });
  }

  deleteSpecificNote(id: string): void {
    this.notesService.deleteUserNotes(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllUserNotes();
      },
    });
  }
}
