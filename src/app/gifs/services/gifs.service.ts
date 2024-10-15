import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { getLocaleTimeFormat } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];


  private _tagHistory: string[] = [];
  private apiKey:      string =  'uabIEpVhyL98wIQgdrB7X4mzQlT54uiB';
  private serviceUrl:  string =  'https://api.giphy.com/v1/gifs';

  constructor( private  http: HttpClient ) {
    this.loadStorage();
    console.log('Gifs Service ready');
  }

  get tagHistory(){
    return [...this._tagHistory]
  }



  private organizeHistory (tag: string){
    tag = tag.toLocaleLowerCase();

    if ( this._tagHistory.includes(tag) ){
        this._tagHistory = this._tagHistory.filter ((oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift( tag );
    this._tagHistory = this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  };

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory) );
  }

  private loadStorage(): void {
    if( !localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse ( localStorage.getItem('history')! );

    if(this._tagHistory.length === 0 ) return;
    this.searchTag( this._tagHistory[0] );
  }

  searchTag( tag: string ): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
      .subscribe(resp => {
        console.log(resp);

        this.gifList = resp.data;
        // console.log({gifs: this.gifList})
      });

  }

}
