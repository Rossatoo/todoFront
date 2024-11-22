import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, RouterModule, HttpClientModule],
  providers: [TodoService],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update(): void {
    this.service.update(this.todo).subscribe((resposta) => {
      this.service.message('informações atualizadas com sucesso!');
      this.router.navigate(['']);
    }, error => {
      this.service.message('erro ao atualizar To-do!');
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

