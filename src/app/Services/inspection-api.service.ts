import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionApiUrl="https://localhost:7161/api"
  constructor(private http:HttpClient) { }

  getInspectionList():Observable<any[]>{
return this.http.get<any>(this.inspectionApiUrl+'/inspection')
  }

  addInspection(data:any){
    return this.http.post(this.inspectionApiUrl+'/inspection',data)
  }

  editInspection(id:number|string,data:any){
    return this.http.put(this.inspectionApiUrl+`/inspection/${id}`,data)
  }

  deleteInspection(id :number|string){
    return this.http.delete(this.inspectionApiUrl+`/inspection/${id}`)
  }

  getInspectionTypesList():Observable<any[]>{
    return this.http.get<any>(this.inspectionApiUrl+'/inspectiontype')
      }
    
      addInspectionTypes(data:any){
        return this.http.post(this.inspectionApiUrl+'/inspectiontype',data)
      }
    
      editInspectionTypes(id:number|string,data:any){
        return this.http.put(this.inspectionApiUrl+`/inspectiontype/${id}`,data)
      }
    
      deleteInspectionTypes(id :number|string){
        return this.http.delete(this.inspectionApiUrl+`/inspectiontype/${id}`)
      }

      getStatusList():Observable<any[]>{
        return this.http.get<any>(this.inspectionApiUrl+'/Status')
          }
        
          addStatus(data:any){
            return this.http.post(this.inspectionApiUrl+'/Status',data)
          }
        
          editStatus(id:number|string,data:any){
            return this.http.put(this.inspectionApiUrl+`/Status/${id}`,data)
          }
        
          deleteStatus(id :number|string){
            return this.http.delete(this.inspectionApiUrl+`/Status/${id}`)
          }
}
