
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private alunos: any[] = [];

  //private alunos = [
  //{ nome: 'João', email: 'joao@example.com', idade: 25, matricula: '12345' },
  //{ nome: 'Maria', email: 'maria@example.com', idade: 22, matricula: '67890' }
  //];

  private alunosSubject = new BehaviorSubject<any[]>(this.alunos);

  getAlunos() {
    return this.alunosSubject.value;
  }

  getAluno(index: number) {
    return this.alunosSubject.value.find((_, i:number) => i === index) 
  }

  getAlunosSubject() {
    return this.alunosSubject.asObservable();
  }

  adicionarAluno(aluno: any) {
    const alunosAtualizados = [...this.alunosSubject.value, aluno];
    this.alunosSubject.next(alunosAtualizados);
    console.log('Aluno adicionado ao serviço:', aluno);
  }

  editarAluno(index: number, aluno: any) {
    const alunosAtualizados = [...this.alunosSubject.value];
    alunosAtualizados[index] = aluno;
    this.alunosSubject.next(alunosAtualizados);
  }

  excluirAluno(index: number) {
    const alunosAtualizados = [...this.alunosSubject.value];
    alunosAtualizados.splice(index, 1);
    this.alunosSubject.next(alunosAtualizados);
  }
}

