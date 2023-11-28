// edicao-aluno.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-aluno',
  templateUrl: './edicao-aluno.component.html',
  styleUrls: ['./edicao-aluno.component.css']
})
export class EdicaoAlunoComponent implements OnInit {

  formulario!: FormGroup;
  aluno: any = {};
  editar = false;
  index: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idade: [null, [Validators.required, Validators.min(1)]],
      matricula: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      

    //console.log('Dados do aluno após teste:', this.formBuilder);
     
    this.route.params.subscribe(params => {
      if (params['index']) {
        this.index = +params['index'];
        this.aluno = this.alunoService.getAluno(this.index);
        this.formulario.setValue({...this.aluno})
        //this.aluno = { ...alunos[this.index] }; // Garante uma cópia para evitar referências compartilhadas
        this.editar = true;
  
        console.log('Dados do aluno no ngOnInit:', this.aluno);
      }
    });
  }
  
  onSubmit() {
    if (this.formulario.valid) {
            
      this.aluno = { ...this.aluno, ...this.formulario.value };
        
      // Chama o serviço para adicionar ou atualizar o aluno
      if (this.editar) {
        // Se estiver editando, chama o método de editar do serviço
        this.alunoService.editarAluno(this.index!, this.aluno);
      } else {
        // Se não estiver editando, chama o método de adicionar do serviço
        this.alunoService.adicionarAluno(this.aluno);
      }
  
      // Navega para a rota de listar após salvar
      this.router.navigate(['/listar']);
    } else {
      console.error('Ocorreu um erro! Verifique seus dados e tente novamente!');
    }
  }
   
}
