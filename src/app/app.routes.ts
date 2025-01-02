import { Routes } from "@angular/router";
import { ListaTarefasComponent } from "./lista-tarefas/lista-tarefas.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listaTarefas',
    pathMatch: 'full',
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'listaTarefas',
    component: ListaTarefasComponent,
    data: {
      reuseComponent: true
    }
  }
];
