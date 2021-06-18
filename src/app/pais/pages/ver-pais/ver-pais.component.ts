import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private PaisService: PaisService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id })=>{
    //   console.log(id);
    //   this.PaisService.getPaisPorId(id).subscribe(pais=> {
    //     console.log(pais);
    //   })
    // })

    this.activatedRoute.params
    .pipe(
      switchMap( (param)=> this.PaisService.getPaisPorId( param.id ) ),
      tap(console.log)
    ).subscribe( pais => this.pais = pais )
  }

}
