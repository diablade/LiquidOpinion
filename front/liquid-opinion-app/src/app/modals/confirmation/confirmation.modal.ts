import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-modal-confirmation',
    templateUrl: './confirmation.modal.html',
    styleUrls: ['./confirmation.modal.scss']
})
export class ConfirmationModal {
    public title: string;
    public message: string;
    public validationButton: string = "VALIDER";
    public cancelButton: string = "ANNULER";
    public isOneButton: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationModal) {
        if (data) {
            if (data.title) {
                this.title = data.title;
            }
            
            if (data.message) {
                this.message = data.message;
            }

            if (data.validationButton) {
                this.validationButton = data.validationButton;
            }

            if (data.cancelButton) {
                this.cancelButton = data.cancelButton;
            }

            if (data.isOneButton) {
                this.isOneButton = data.isOneButton;
            }
        }
    }

}