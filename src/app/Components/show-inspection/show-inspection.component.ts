import { Component, OnInit } from '@angular/core';
import { InspectionApiService } from 'src/app/Services/inspection-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypesList:any=[];


  inspectionTypesMap:Map<number,string>=new Map();

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$=this.service.getInspectionList();
    this.inspectionTypesList$=this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }
  //Varables (properties)

  modalTitle:string="";
  activateAddEditInspectionComponent:boolean=false;
  inspection:any;
  modelClose(){
   this.activateAddEditInspectionComponent=false;
   this.inspectionList$=this.service.getInspectionList();
  }
  modalAdd(){
    this.inspection={
      id:0,
      status:null,
      comment:null,
      inspectionTypeId:null
    }
    this.modalTitle="Add Inspection";
    this.activateAddEditInspectionComponent=true;
  }
  modelEdit(item:any){
this.inspection=item;
this.modalTitle="Edit Inspection";
this.activateAddEditInspectionComponent=true;
  }
  modelDelete(item:any){
    if(confirm(`are you sure want to delete inspection ${item.id}`))
    this.service.deleteInspection(item.id).subscribe(res=>{
      var closeModalBtn =document.getElementById('add-edit-model-close');
    if(closeModalBtn){
      closeModalBtn.click();
    }
    var showDeleteSuccess=document.getElementById('delete-success-alert');
    if(showDeleteSuccess){
      showDeleteSuccess.style.display="block";
    }
    setTimeout(() => {
      if(showDeleteSuccess){
        showDeleteSuccess.style.display="none"
      }
    }, 4000);
    this.inspectionList$=this.service.getInspectionList();
    })
    this.inspection=item;
    this.modalTitle="Edit Inspection";
    this.activateAddEditInspectionComponent=true;
      }
  refreshInspectionTypesMap(){
    this.service.getInspectionTypesList().subscribe(data=>{
      this.inspectionTypesList=data;
      for(let i=0;i<data.length;i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id,this.inspectionTypesList[i].inspectionName);
      }
    })
  }
}
