import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { StorageService } from "./storage.service";

interface CardData {
    total: string,
    trend: string,
    direction: string
}

export interface PeriodicElement {
  name: string;
  status: string;
  role: string;
  email: string;
  teams: string[]
}

const ELEMENT_DATA: PeriodicElement[] = environment.team_members;

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    private storage = inject(StorageService)
    
    private _name = new BehaviorSubject<string>('Oreoluwa');
    private _revenue = new BehaviorSubject<CardData>(environment.revenue);
    private _users = new BehaviorSubject<CardData>(environment.users);
    private _conversions = new BehaviorSubject<CardData>(environment.conversions);
    private _signups = new BehaviorSubject<CardData>(environment.signups);
    private _team_members = new BehaviorSubject<PeriodicElement[] | null>(null);

    get userName() {
        return this._name.asObservable();
    }
    
    get revenueInfo() {
        return this._revenue.asObservable();
    }

    get usersInfo() {
        return this._users.asObservable();
    }

    get conversionInfo() {
        return this._conversions.asObservable();
    }

    get signupInfo() {
        return this._signups.asObservable();
    }
   
    get teamMemberInfo() {
        return this._team_members.asObservable();
    }

    getTeamMembers() {
        this.storage.setItem('team_members', environment.team_members);
        const teamMembers = this.storage.getItem<PeriodicElement[]>('team_members');
        this._team_members.next(teamMembers || ELEMENT_DATA);
    }

    addMember(member: PeriodicElement) {
        environment.team_members.unshift(member);
        const updatedList = [...environment.team_members]; 
        console.log(updatedList);
        this._team_members.next(updatedList);
        this.storage.setItem('team_members', updatedList);

    }

    filterMember(index: number) {
        environment.team_members.splice(index, 1);
        const updatedList = [...environment.team_members]; 
        console.log(updatedList);
        this._team_members.next(updatedList);
        this.storage.setItem('team_members', updatedList);
    }

    updateMember(updatedData : PeriodicElement, index: number) {
        const members = [...environment.team_members];
        if (index >= 0 && index < members.length) {
            members[index] = { ...members[index], ...updatedData  };
            environment.team_members = members;
            this._team_members.next(members);
            this.storage.setItem('team_members', members);

        }  else {
            console.warn('Invalid index passed to updateMember');
        }
    }


}