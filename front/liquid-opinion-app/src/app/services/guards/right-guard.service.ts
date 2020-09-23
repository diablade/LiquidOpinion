import {Injectable} from '@angular/core';
import {UserService} from "../user.service";
import {Rights} from "../../models/rights";
import {coerceArray} from "@angular/cdk/coercion";

@Injectable({
	providedIn: 'root'
})
export class RightGuard {
	
	constructor(private userService: UserService) {
	}
	
	userHasRight(rights: Rights[] | Rights): boolean {
		const rs = coerceArray(rights);
		return rs.every(r => this.userService.getRights().includes(r));
	}
}

