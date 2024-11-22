import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, RouterModule, HttpClientModule],
  providers: [TodoService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
    
  }

  create(): void {
    this.formataData()
    this.service.create(this.todo).subscribe((resposta) => {
      this.service.message('To-do criado com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao cria To-do!');
      this.router.navigate(['']);
    })

  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}
