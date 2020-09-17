import { MaterialTableCols } from './material-table-cols';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnChanges {

  private orderBy: string;
    private upwards: boolean;
    pagedData: any;
    private page: any;
    private data: any;
    private showPage: number;
    private multiplePages: boolean;
    private showNumberOfRowsSelect: boolean;
    private numberOfRecords: number;
    private lowerIndex: number;
    private upperIndex: number;
    private selectAllSelected: boolean;
    private selected: boolean[];
    private showSelectedItems: boolean;
    private numberOfSelectedItems: number;
    private total: string[];

    @Input() title: string;
    @Input() json: string;
    @Input() columns: MaterialTableCols[];
    @Input() numberOfRows: number;
    @Input() numberOfRowsSelectable: number[];
    @Input() rowSelect: string;
    @Input() selectStyle: string;
    @Input() showHeader: boolean;
    @Input() showFooter: boolean;
    @Input() showSumme: boolean;
    @Input() style: string;

    @Output() onRowSelect = new EventEmitter<any[]>();

    constructor() { }

    ngOnChanges() {
        if (this.json) {
            console.log("this.json", this.json);
            this.data = JSON.parse(this.json);
            this.numberOfRecords = this.data.length;
        }
        this.showPage = 0;
        this.upwards = true;
        this.selected = [];
        this.total = [];

        if (this.columns) {
            for (let i = 0; i < this.columns.length; i++) {
                if (!this.columns[i].align) {
                    this.columns[i].align = 'left';
                }
            }
        }

        if (this.columns) {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].sortIcon === undefined) {
                    this.columns[i].sortIcon = true;
                }
            }
        }


        if (this.numberOfRowsSelectable) {
            this.showNumberOfRowsSelect = true;
        } else {
            this.showNumberOfRowsSelect = false;
        }

        if (this.data) {
            for (let i = 0; i < this.data.length; i++) {
                this.data[i].tempRecordIndex = i;
                this.selected.push(false);
            }
        }
        if (this.columns) {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].format === 'price') {
                    if (this.data) {
                        for (let iData = 0; iData < this.data.length; iData++) {
                            if (!this.data[iData][this.columns[i].property]) {
                                const number = 0;
                                this.data[iData][this.columns[i].property] = number.toFixed(2);
                            } else {
                                const number = this.data[iData][this.columns[i].property];
                                const numberToRound = number * 100;
                                const roundedNumber = Math.round(numberToRound);
                                const result = roundedNumber / 100;
                                this.data[iData][this.columns[i].property] = result.toFixed(2);
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].total) {
                    let total = 0;
                    let fixedTotal: string;
                    if (this.data) {
                        if (this.columns[i].format === 'price') {
                            for (let iData = 0; iData < this.data.length; iData++) {
                                total = total + Number(this.data[iData][this.columns[i].property]);
                            }
                            const numberToRound = total * 100;
                            const roundedNumber = Math.round(numberToRound);
                            const result = roundedNumber / 100;
                            fixedTotal = result.toFixed(2);
                        } else {
                            for (let iData = 0; iData < this.data.length; iData++) {
                                total = total + this.data[iData][this.columns[i].property];
                            }
                            fixedTotal = total.toString();
                        }
                    }
                    this.total.push(fixedTotal);
                } else {
                    this.total.push(null);
                }
            }
            if (this.data) {
                this.paginate();
            }
        }
    }

    reorder(property: string) {
        if (this.data) {
            if (this.orderBy === property) {
                this.upwards = !this.upwards;
                this.data.reverse();
            } else {
                this.upwards = true;
                this.orderBy = property;
                this.data.sort(compare);
            }

            this.paginate();
        }

        function compare(a, b) {
            // Check if String
            if (typeof a[property] === 'string') {
                a = a[property].toLowerCase();
            } else {
                a = a[property];
            }
            if (typeof b[property] === 'string') {
                b = b[property].toLowerCase();
            } else {
                b = b[property];
            }

            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    paginate() {
        if (this.numberOfRows < this.data.length) {
            this.multiplePages = true;
            this.pagedData = [];
            this.page = [];

            for (let iData = 0; iData < this.data.length; iData++) {
                if (iData % this.numberOfRows > 0 || iData === 0) {
                    this.page.push(this.data[iData]);
                } else {
                    this.pagedData.push(this.page);
                    this.page = [];
                    this.page.push(this.data[iData]);
                }

                if (iData + 1 === this.data.length) {
                    this.pagedData.push(this.page);
                }
            }
        } else {
            this.multiplePages = false;
            this.pagedData = [];
            this.pagedData.push(this.data);
        }
        this.showPage = 0;
        this.setIndex();
        this.unselect();
    }

    previous() {
        if (this.showPage > 0) {
            this.showPage--;
        }
        this.setIndex();
    }

    next() {
        if (this.showPage + 1 < this.pagedData.length) {
            this.showPage++;
        }
        this.setIndex();
    }

    setIndex() {
        if (this.showPage < 1) {
            this.lowerIndex = 1;
            this.upperIndex = this.numberOfRows;
        } else if (this.showPage + 1 >= this.pagedData.length) {
            // if (this.pagedData[0].length === this.pagedData[this.showPage].length) {
            //     this.lowerIndex = this.numberOfRecords - this.pagedData[0].length + 1;
            // } else if (this.pagedData[this.showPage].length === 1 ) {
            //     this.lowerIndex = this.numberOfRecords;
            // } else {
            //     this.lowerIndex =
            //         this.pagedData[0].length * (this.pagedData.length - 1)
            //         + (this.pagedData[0].length - this.pagedData[this.showPage].length);
            // }
            this.lowerIndex = this.numberOfRecords - this.pagedData[this.showPage].length + 1;
            this.upperIndex = this.numberOfRecords;
        } else {
            this.lowerIndex = (this.showPage + 1) * this.pagedData[0].length - this.pagedData[0].length + 1;
            this.upperIndex = (this.showPage + 1) * this.pagedData[0].length;
        }


        this.unselect();
    }

    selectAll() {
        for (let i = 0; i < this.pagedData[this.showPage].length; i++) {
            if (this.selectAllSelected) {
                this.selected[this.pagedData[this.showPage][i].tempRecordIndex] = true;
            } else {
                this.selected[this.pagedData[this.showPage][i].tempRecordIndex] = false;
            }
        }
        this.setNumberOfSelectedItems();
    }

    select(selectIndex: number) {

        if (this.selectStyle === 'background') {
            this.selected[selectIndex] = !this.selected[selectIndex];
        }

        this.selectAllSelected = false;
        if (this.rowSelect === 'single') {
            for (let i = 0; i < this.selected.length; i++) {
                if (i !== selectIndex) {
                    this.selected[i] = false;
                }
            }
        }
        this.unselect();
        this.setNumberOfSelectedItems();
    }

    unselect() {
        let selectAll = true;
        for (let i = 0; i < this.pagedData[this.showPage].length; i++) {
            if (this.selected[this.pagedData[this.showPage][i].tempRecordIndex] === false) {
                selectAll = false;
            }
        }

        if (selectAll) {
            this.selectAllSelected = true;
        } else {
            this.selectAllSelected = false;
        }
    }

    setNumberOfSelectedItems() {
        const tempData = JSON.parse(this.json);
        const outputData = [];

        this.numberOfSelectedItems = 0;
        for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i] === true) {
                this.numberOfSelectedItems++;
            }
        }
        if (this.rowSelect === 'multiple') {
            if (this.numberOfSelectedItems > 0) {
                this.showSelectedItems = true;
            } else {
                this.showSelectedItems = false;
            }
        }

        for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i]) {
                outputData.push(tempData[i]);
            }
        }

        this.onRowSelect.emit(outputData);
    }
}