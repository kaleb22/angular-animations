import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { Tarefa } from '../interface/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly API = 'http://localhost:3000/tarefas';
  private http = inject(HttpClient);

  private tarefaBehaviourSubject = new BehaviorSubject<string>('');
  private tarefaBehaviourSubject$ = this.tarefaBehaviourSubject.asObservable();

  listar() {
    this.tarefaBehaviourSubject.next('');
  }

  listaTarefas$ = this.tarefaBehaviourSubject$.pipe(
    switchMap( () => this.http.get<Tarefa[]>(this.API, this.criarHeadersParams()))
  );

  private criarHeadersParams() {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });

    return { params };
  }

  criar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API, tarefa);
  }

  editar(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.API}/${tarefa.id}`;
    return this.http.put<Tarefa>(url, tarefa);
  }

  excluir(id: number): Observable<Tarefa> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Tarefa>(url);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    const url = `${this.API}/${id}`;
    return this.http.get<Tarefa>(url);
  }

  atualizarStatusTarefa(tarefa: Tarefa): Observable<Tarefa> {
    tarefa.statusFinalizado = !tarefa.statusFinalizado;
    return this.editar(tarefa);
  }
}
