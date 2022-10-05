import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import type { Request } from "@app/interfaces/Request.interface";

@Component({
  selector: 'request-dialog',
  templateUrl: './view-request-dialog.component.html',
})
export class ViewRequestDetailDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewRequestDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public request: Request,
  ) {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
