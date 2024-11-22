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


@Component({
  selector: 'app-finalizados',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, MatButtonModule, MatIconModule, CommonModule, MatBadgeModule, MatSnackBarModule],
  providers: [TodoService],
  templateUrl: './finalizados.component.html',
  styleUrl: './finalizados.component.css'
})
export class FinalizadosComponent implements OnInit{
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
        }
      })
      
    })
  }

  voltar(): void {
    this.router.navigate([''])
  }

}
