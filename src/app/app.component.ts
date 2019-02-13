import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {Issue} from './models/issue.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    repoUrl = "";
    issues = [];
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalPages: number = 0;

    /**
     * @param {HttpClient} _http
     */
    constructor(private _http: HttpClient){
    }

    /**
     * When pagination is clicked change the current page and call loadIssues
     * @param {number} pageNum
     */
    onPageChange(pageNum: number): void {
        this.currentPage = pageNum;
        this.loadIssues();
    }

    /**
     * Load issues from the github API
     */
    loadIssues() {
        let params = new HttpParams()
            .set('page', String(this.currentPage))
            .set('per_page', String(this.itemsPerPage));

        let nameRepo = this.repoUrl
                        .trim()
                        .replace('https://github.com/', '');

        this._http.get<Issue[]>(
            'https://api.github.com/repos/' + nameRepo + '/issues',
            {observe: 'response',params: params, responseType: "json"})
            .subscribe(res => {
                //Get the response body:
                this.issues = res.body;

                //Get the response.headers here is the number of pages for the paginator
                const links = res.headers.get('link').split(',');
                let maxPage: number = 0;
                links.forEach(function(link) {
                    let page = /\?page=(\d+)/gm.exec(link);
                    if(page[1] && maxPage < Number(page[1])){
                        maxPage = Number(page[1]);
                    }
                });
                this.totalPages = maxPage;
                console.log(this.totalPages);
        });

    }

    /**
     * If "enter" is pressed in the input call the api (same as the button)
     * @param {event} event
     */
    onKeydown(event) {
        if (event.key === "Enter") {
            this.loadIssues();
        }
    }

}
