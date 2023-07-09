import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {
  ResponseCARPOS :any;
  ResponceALLData : any;
  ResponceNetDorTOOPEN :any;
  constructor(private http : HttpClient,) 
  { 

  }
  host : string = "https://localhost:44376/api/values";
  private getCarin = this.host+"/GetDor";
  private nextdor = this.host+"/NextDor";
  private getAll = this.host+"/GetAllData";
  private Action = this.host+"/Action";
  private ResetData = this.host+"/resetdata";
  private Reaptaction = this.host+"/Reaptaction";
  async getalldata()
  {
    try{
      const data =this.http.post<any>(this.getAll,{});
      this.ResponceALLData = await firstValueFrom(data);
      return this.ResponceALLData;

    }
    catch(error)
    {
      console.log(error);
    }
   
  }
    
   async getCarIN()
  {
    try{
      const data = this.http.post(this.getCarin,{},{responseType: 'text'});
     this.ResponseCARPOS= await firstValueFrom(data);
     return this.ResponseCARPOS;  

    }
    catch(error)
    {
      console.log(error);
    }
         
  }

   RepeatAct(atype : string , count :string ){
    const formData = new FormData();
    formData.append('atype', atype);
    formData.append('count', count);
    return this.http.post(this.Reaptaction,formData,{});
   }
   ResetGameData()
   {
     return this.http.post<any>(this.ResetData,{});
   }
   getNextDortoOpen( ClickedDorID : string)
  {
    
    const formData = new FormData();
    formData.append('dname', ClickedDorID);
    return this.http.post(this.nextdor,formData,{responseType: 'text'});
              
  }

  perfomAction(Attype :string , Dorname : string )
  {
    const formData = new FormData();
    formData.append('atype', Attype);
    formData.append('dorname' ,Dorname);
    return this.http.post(this.Action,formData,{responseType: 'text'});

  }

 
}
