import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { FinalizadosComponent } from './components/finalizados/finalizados.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [HeaderComponent,ReadAllComponent, FooterComponent, MatToolbarModule, RouterModule, FinalizadosComponent]
})
export class AppComponent {
  title = 'todoFront';
}

