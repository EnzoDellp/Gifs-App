import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string="z2BcHWtVDkGalAiHkvegBVo2bAHQ5Da0";
  private _historial:string[]=[];

  // cambiar  any por su tipo

  public resultados:Gif[]=[];


  get historial(){
    return[...this._historial];
  }

  constructor(private http: HttpClient){ 

     //cargar de local storage


     this._historial=JSON.parse( localStorage.getItem("historial")!) || [];

     this.resultados=JSON.parse( localStorage.getItem("resultados")!) || [];




    // if (localStorage.getItem("historial")) {
    //    this._historial= JSON.parse( localStorage.getItem("historial")!);

    // }
  }

  buscarGifs(query:string=""){

    query=query.trim().toLocaleLowerCase();
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      //guardar el historial

      localStorage.setItem("historial",JSON.stringify(this._historial));


      const params=new HttpParams()
      .set("api_key",this.apiKey)
      .set("limit","10")
      .set("q",query);

      console.log(params.toString());
    }

  //llamado
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=z2BcHWtVDkGalAiHkvegBVo2bAHQ5Da0&q=${query}&limit=10`)
    .subscribe( (resp) =>{
      this.resultados=resp.data;


      localStorage.setItem("resultados",JSON.stringify(this.resultados));
    })
    
  }



}
