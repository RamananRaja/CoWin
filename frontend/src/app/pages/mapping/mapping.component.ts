import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { WebReqService } from '../../services/web-req.service';
//import * as xlsxj from 'xlsx-to-json';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {

  mapped: Map<string, string> = new Map<string, string>();
  processedData: any;
  DbSchemaNames = ['companyName', 'empId', 'empName', 'mobile', 'email', 'cowinRefId  ', 'mobileForReg', 'doseNo', 'dependent', 'beneficiaryMobile', 'preferredDate', 'preferredTime', 'vaccineName', 'venue', 'pass'];
  excelKeys: any;
  constructor(private webreqservice: WebReqService) { }

  ngOnInit(): void {

  }

  schemaFun(count: any, schemaName: string) {
    console.log(count, schemaName);

    this.mapped.set(this.excelKeys[count], schemaName);
  }

  onSubmitClicked() {
    for (let data of this.processedData) {
      for (let [key, value] of this.mapped) {
        this.renameKey(data, key, value);
      }
    }
    console.log(this.processedData);


    this.webreqservice.saveData(this.processedData).subscribe((res: any) => {
      console.log(res);
    });

  }

  renameKey(obj: any, oldKey: string, newKey: any) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }



  mappingKeys(rowObject: any) {
    let mapArr = [];
    const obj = rowObject[0];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        mapArr.push(key);
        console.log(key);
      }
    }
    this.excelKeys = mapArr;
  }

  onFileChangeClicked(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('cannot read multiple files');

    const reader: FileReader = new FileReader();

    reader.readAsBinaryString(evt.target.files[0]);
    reader.onload = (event) => {
      let data = event.target?.result;
      let WorkBook = XLSX.read(data, { type: 'binary' });
      console.log(WorkBook);
      WorkBook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(WorkBook.Sheets[sheet]);
        console.log(rowObject);
        this.processedData = rowObject;
        this.mappingKeys(rowObject);
      })
    }

    /*
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      const jsonstr = JSON.stringify(this.data, undefined, 4);

      console.log(jsonstr);
    }

    reader.readAsBinaryString(target.files[0]);*/
  }

  //cover to json
  /*
  converToJSON(event: any) {
    xlsxj({
      input: event.target.files[0],
      output: "output.json"
    }, function (err: any, result: any) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  }*/
}
