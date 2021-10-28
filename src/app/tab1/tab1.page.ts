import { MoviesService, SearchType } from '../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  results2: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  constructor(private movieService: MoviesService) { }
  
  ngOnInit() { }

  searchChanged(){
    // Call our service function which returns an Observable
    this.results2 = this.movieService.searchMulti(this.searchTerm);

    console.log("My results: " + this.results2);
  }
}
