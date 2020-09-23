import {Injectable} from '@angular/core';
import {CaracteristiqueTechnique, Survey, MaterielQuery} from "../models/survey";
import {SurveyProvider} from "../providers/survey-provider.service";
import {Observable, ReplaySubject} from "rxjs";
import {SearchProvider} from "../providers/search.provider";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private optionsTechnicalCharacteristics: Observable<CaracteristiqueTechnique[]>;
	private optionsReferential: Observable<any[]>;
	private optionsStatus: Observable<any[]>;

	private listInventory: Survey[] = [];
	private listCycle: Survey[] = [];
	private listSignalement: Survey[] = [];

	subListInventory = new ReplaySubject<Survey[]>(1);
	subListCycle = new ReplaySubject<Survey[]>(1);
	subListSignalement = new ReplaySubject<Survey[]>(1);


	constructor(private equipmentProvider: SurveyProvider,
	            private searchProvider: SearchProvider) {
	}

	getEquipments(from: string, previousData: boolean, query: MaterielQuery) {
		if (!previousData && query) {
			switch (from) {
				case 'inventory':
					this.equipmentProvider.getEquipmentsForInventory(query).subscribe(equips => {
						this.listInventory = equips;
						this.emitResults(from);
					});
					break;
				case 'etat':
					this.equipmentProvider.getEquipmentsForCycle(query).subscribe(equips => {
						this.listCycle = equips;
						this.emitResults(from);
					});
					break;
				case 'signalement':
					this.equipmentProvider.getEquipmentsForReporting(query).subscribe(equips => {
						this.listSignalement = equips;
						this.emitResults(from);
					});
					break;
			}
		} else {
			this.emitResults(from);
		}
	}

	emitResults(to: string) {
		switch (to) {
			case 'inventory':
				this.subListInventory.next(this.listInventory);
				break;
			case 'etat':
				this.subListCycle.next(this.listCycle);
				break;
			case 'signalement':
				this.subListSignalement.next(this.listSignalement);
				break;
		}
	}

	getOptionsTechnicalCharacteristics(): Observable<CaracteristiqueTechnique[]> {
		if (!this.optionsTechnicalCharacteristics) {
			this.optionsTechnicalCharacteristics = this.searchProvider.getTechnicalCharacteristics()
			.pipe(
				publishReplay(1),
				refCount()
			);
		}
		return this.optionsTechnicalCharacteristics;
	}

	getReferential(): Observable<any[]> {
		if (!this.optionsReferential) {
			this.optionsReferential = this.searchProvider.getReferentiels()
			.pipe(
				publishReplay(1),
				refCount()
			);
		}
		return this.optionsReferential;
	}

	getOptionsStatus(): Observable<any[]> {
		if (!this.optionsStatus) {
			this.optionsStatus = this.searchProvider.getStatus()
			.pipe(
				publishReplay(1),
				refCount()
			);
		}
		return this.optionsStatus;
	}

	getOptionsAssignments() {
		return this.optionsAssignments;
	}

	clearCache() {
		this.optionsTechnicalCharacteristics = null;
		this.optionsReferential = null;
		this.optionsStatus = null;
	}

	optionsAssignments = [
		{
			label: 'Individu',
			value: 'IND'
		},
		{
			label: 'Local',
			value: 'LOC'
		},
		{
			label: 'Véhicule',
			value: 'VEH'
		},
		{
			label: 'Non affecté',
			value: 'NAF'
		}
	];
}


