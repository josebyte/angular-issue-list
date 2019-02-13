import {User} from './user.model';

export class Issue {
    html_url: string ;
    repository_url: string;
    title: string;
    number: number;
    state: string;
    user: User;
}