import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgClass, NgFor, AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { TarefaService } from 'src/app/service/tarefa.service';
import { Tarefa } from '../interface/tarefa';
import { MensagemComponent } from '../componentes/mensagem/mensagem.component';
import { checkedStateTrigger, focusStateTrigger, showStateTrigger } from '../animations';

@Component({
    selector: 'app-lista-tarefas',
    templateUrl: './lista-tarefas.component.html',
    styleUrls: ['./lista-tarefas.component.css'],
    imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass, MensagemComponent, NgFor, AsyncPipe],
    animations: [focusStateTrigger, showStateTrigger, checkedStateTrigger],
})
export class ListaTarefasComponent {
  private service = inject(TarefaService);
  private fomBuilder = inject(FormBuilder);

  listaTarefas$: Observable<Tarefa[]> = this.service.listaTarefas$.pipe(
    tap( (res) => this.listaTarefas = res)
  );
  listaTarefas: Tarefa[] = [];
  formAberto: boolean = false;
  categoria: string = '';
  validado: boolean = false;
  indexTarefa: number = -1;
  id: number = 0;

  formulario: FormGroup = this.fomBuilder.group({
    id: ['0'],
    descricao: ['', Validators.required],
    statusFinalizado: [false, Validators.required],
    categoria: ['', Validators.required],
    prioridade: ['', Validators.required],
  });

  mostrarFormulario() {
    this.formAberto = true;
  }

  salvarTarefa() {
    this.criarTarefa();
  }

  editarTarefa() {
    this.service.editar(this.formulario.value).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  criarTarefa() {
    console.log('criar ', this.formulario.value);
    if(this.listaTarefas.length > 0) {
      const ultimaTarefa = this.listaTarefas.at(this.listaTarefas.length - 1) as Tarefa;
      const novoId = (++ultimaTarefa.id).toString();
      this.formulario.patchValue({id: novoId});
    } else {
      this.formulario.patchValue({id: '1'});
    }
    this.service.criar(this.formulario.value).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  excluirTarefa(id: number) {
    console.log('id -> ', id);
    if (id) {
      this.service.excluir(id).subscribe({
        complete: () => this.recarregarComponente(),
      });
    }
  }

  cancelar(event: Event) {
    event.preventDefault();
    this.formAberto = !this.formAberto;
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.formulario.reset({
      descricao: '',
      statusFinalizado: false,
      categoria: '',
      prioridade: '',
    });
  }

  recarregarComponente() {
    this.service.listar();
  }

  atualizarComponente() {
    this.recarregarComponente();
    this.resetarFormulario();
  }

  carregarParaEditar(id: number) {
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.formulario = this.fomBuilder.group({
        id: [tarefa.id],
        descricao: [tarefa.descricao],
        categoria: [tarefa.categoria],
        statusFinalizado: [tarefa.statusFinalizado],
        prioridade: [tarefa.prioridade],
      });
    });
    this.formAberto = true;
  }

  finalizarTarefa(id: number) {
    this.id = id
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.service.atualizarStatusTarefa(tarefa).subscribe(() => {
        // this.listarAposCheck();
      });
    });
  }

  // listarAposCheck() {
  //   this.service.listar().subscribe((listaTarefas) => {
  //     this.listaTarefas = listaTarefas;
  //   });
  // }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    if (
      this.formulario.get(campoAtual)?.errors &&
      this.formulario.get(campoAtual)?.touched
    ) {
      this.validado = false;
      return 'form-tarefa input-invalido';
    } else {
      this.validado = true;
      return 'form-tarefa';
    }
  }
}
