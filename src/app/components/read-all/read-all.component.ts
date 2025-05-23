import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read-all',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule, HttpClientModule, MatBadgeModule, MatSnackBarModule, RouterModule],
  providers: [TodoService],
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit{

  closed = 0;

  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if(todo.finalizado){
          this.listFinished.push(todo);
        } else {
         this.list.push(todo);
        }
      })
      this.closed = this.listFinished.length;
    })
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
      this.service.message('Task finalizada com sucesso!');
      this.list = this.list.filter(todo => todo.id !== item.id);
      this.closed++;
    })
  }

  delete(id: any): void {
    this.service.delete(id).subscribe({
      next: () => {
        // Atualiza a lista filtrando a tarefa deletada
        this.list = this.list.filter(todo => todo.id !== id);
        
        // Atualiza a contagem de tarefas finalizadas se necessário
        this.closed = this.listFinished.length;
  
        // Exibe a mensagem de sucesso
        this.service.message('Task deletada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar a task:', err);
        this.service.message('Erro ao deletar a task!');
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }

}
