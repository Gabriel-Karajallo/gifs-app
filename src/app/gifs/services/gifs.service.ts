import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor() { }

  get tagHistory(){
    return [...this._tagHistory]

  }

  public searchTag( tag: string ): void{
    this._tagHistory.unshift( tag );

    console.log(this.tagHistory);

  }

}
