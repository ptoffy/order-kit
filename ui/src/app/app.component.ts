import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<h1>Angular App</h1>',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/').subscribe((data: any) => {
      console.log(data);
    });
  }
}
