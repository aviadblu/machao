import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent implements OnInit {
  @Input() spec: any;
  @Input() data: any;

  columns: Array<any> = [];
  rowData: Array<any>;
  ready: boolean = false;
  colDataHolder = {};
  new_row;

  constructor() {

  }

  private createRow(row) {
    row.editMode = false;
    row.highlight = false;
    row.error = false;
    return row;
  }

  ngOnInit() {
    this.columns = this.spec.columns;
    this.prepareColumns();
    this.resetNewRow();
    this.requestData();
  }

  prepareColumns() {
    let self = this;
    this.columns.forEach((col) => {
      if (col.comboSource) {
        col.comboSource()
          .subscribe((data) => {
              self.colDataHolder[col.name] = data;
            },
            self.handleError);
      }
    });
  }

  resetNewRow() {
    this.new_row = {};
    this.columns.forEach((col) => {
      if (!col.cantEdit) this.new_row[col.name] = '';
    });
    console.log(this.new_row);
  }

  private requestData() {
    this.rowData = [];
    let self = this;
    this.spec.api.getData()
      .subscribe((data) => {
          data.forEach((row) => {
            this.rowData.push(this.createRow(row));
          });
          self.ready = true;
        },
        self.handleError);
  }

  private handleError(message) {
    // todo handle error messages
    console.error(message);
  }

  editRow(index) {
    this.rowData[index].editMode = true;
  }

  cancelEditRow(index) {
    this.rowData[index].editMode = false;
  }

  saveRow(index) {
    let self = this;
    this.spec.api.update(this.rowData[index])
      .then(() => {
        self.requestData();
        self.rowData[index].highlight = true;
        setTimeout(() => {
          self.rowData[index].highlight = false;
        }, 400);
      }, (error) => {
        self.rowData[index].error = true;
        self.handleError(error);
      });
    this.rowData[index].editMode = false;
  }

  deleteRow(index) {
    let self = this;
    if (confirm('Remove row?')) {
      this.spec.api.delete(this.rowData[index].id)
        .then(() => {
          self.requestData();
        }, (error) => {
          self.rowData[index].error = true;
          self.handleError(error);
        });
    }
  }

}
