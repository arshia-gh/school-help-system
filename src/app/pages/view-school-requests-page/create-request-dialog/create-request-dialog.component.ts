import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import type { Request } from "@app/interfaces/Request.interface";

@Component({
  selector: 'create-request-dialog',
  templateUrl: './create-request-dialog.component.html',
})
export class CreateRequestDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateRequestDialog>
  ) {
  }

  closeClicked() {
    this.dialogRef.close()
  }
}
