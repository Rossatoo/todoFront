import { Routes } from '@angular/router';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { FinalizadosComponent } from './components/finalizados/finalizados.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

export const routes: Routes = [
    {
        path: '',
        component: ReadAllComponent
    },
    {
        path: 'finalizados',
        component: FinalizadosComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'update/:id',
        component: UpdateComponent
    }
];
