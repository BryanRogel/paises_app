import { Component, Output } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent{

  termino: string = '';
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError =  false;
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino).subscribe(resp=>{
      this.paises = resp;
    }, (err)=>{
      this.hayError = true;
      this.paises = [];
      console.log('error');
      console.info(err);
    })
  }

  sugerencias(termino: string) {
    this.hayError =  false;
    this.mostrarSugerencias = true;
    this.termino = termino;

    this.paisService.buscarPais(termino)
    .subscribe(
      paises => this.paisesSugeridos = paises.splice(0,3),
      paises => this.paisesSugeridos = []
      )
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
