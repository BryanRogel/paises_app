import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: []
})
export class PorRegionComponent {

  region: string = '';
  paises: Country[] = [];
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';


  constructor(private paisService: PaisService) { }

  activarRegion(region: string) {
    if (region === this.regionActiva) { return; }
    
    this.regionActiva = region;
    this.paises = [];
    this.region = region;
    this.paisService.buscarRegion(this.region).subscribe(resp => {
      this.paises = resp;
    }, (err) => {
      this.paises = [];
      console.log('error');
      console.info(err);
    })
  }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva ? 'btn btn-primary mr-1' : 'btn btn-outline-primary mr-1')
  }

}
