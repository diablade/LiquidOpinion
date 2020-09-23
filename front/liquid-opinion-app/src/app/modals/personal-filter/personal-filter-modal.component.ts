import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-personal-filter',
    templateUrl: './personal-filter-modal.component.html',
    styleUrls: ['./personal-filter-modal.component.scss']
})
export class PersonalFilterModal {

    formNotValid = true;
    
    color: string;

    constructor(public dialogRef: MatDialogRef<PersonalFilterModal>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    colorSelect(color) {
        this.data.color = color;
    }

    onNameChange(name) {
        this.formNotValid = name.length <= 0;
    }
}

interface DialogData {
    name: string;
    color: string;
    pattern: string;
}
