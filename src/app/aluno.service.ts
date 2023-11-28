import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private alunos: any[] = [];
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
    const alunosAtuais = this.alunosSubject.value.slice(); // Cria uma cópia da lista atual de alunos
    alunosAtuais.push(aluno); // Adiciona o novo aluno à lista
    this.alunosSubject.next(alunosAtuais); // Emite a nova lista de alunos para o Subject
    console.log('Aluno adicionado ao serviço:', aluno);
  }

  editarAluno(index: number, aluno: any) {
    const alunosAtuais = this.alunosSubject.value.slice(); // Cria uma cópia da lista atual de alunos
    if (index >= 0 && index < alunosAtuais.length) {
      alunosAtuais[index] = aluno; // Atualiza o aluno na posição especificada
      this.alunosSubject.next(alunosAtuais); // Emite a lista atualizada para o Subject
    } else {
      console.error('Índice inválido para edição.');
    }
  }

  excluirAluno(index: number) {
    const alunosAtuais = this.alunosSubject.value.slice(); // Cria uma cópia da lista atual de alunos
    if (index >= 0 && index < alunosAtuais.length) {
      alunosAtuais.splice(index, 1); // Remove o aluno na posição especificada
      this.alunosSubject.next(alunosAtuais); // Emite a lista atualizada para o Subject
    } else {
      console.error('Índice inválido para exclusão.');
    }
  }
}

