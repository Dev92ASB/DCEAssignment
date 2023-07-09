import { Component } from '@angular/core';
import { GameserviceService } from '../gameservice.service';
import { map } from 'rxjs';
import { from } from 'rxjs';
import { Location } from '@angular/common';

@Component(
  {
  selector: 'app-game-puzzle',
  templateUrl: './game-puzzle.component.html',
  styleUrls: ['./game-puzzle.component.css','../../../bootstrap/bootstrap.min.css']
 
}) 
export class GamePuzzleComponent {
  constructor(private api : GameserviceService ) {}
   doorimg : string ="../../assets/img/door.png";
   carimg :  string ="../../assets/img/car.png";
   goatimg : string ="../../assets/img/goat.png";

  defaultImgsrc : string = this.doorimg; //door image as default image
 
  dorImg :string ="";

  dorAimg :string ="";
  dorBimg :string ="";
  dorCimg :string ="";
   txtcount : string ="";
   selectedopt: string = "Switch" ;

  nextopen : string ="";  //open this dor after click -- store here the data from api return as next to open
  Carin : string ="";     //store random dor -- car behind 

  goatin  = ["B","C"];

  
  ClickedDorID : string =  "" ;

  gamedata: any;
  Wins : number = 1;
  Play : number = 2;

async getAlldata ()
{const promise =this.api.getalldata() ;
  from(promise).subscribe(data => {this.gamedata = data});
}
 async getNextOpenDor()
{
  //window.alert(this.ClickedDorID);
  this.api.getNextDortoOpen(this.ClickedDorID).subscribe(data  => { this.nextopen = data });
 //  window.alert(this.nextopen);
 // window.alert(this.nextopen);
}

ResetGameData_ (){
  
  this.gamedata = null;
  this.api.ResetGameData().subscribe(data => {console.log(data.toString())});
  this.getAlldata();
  //this.getAlldata();
  //window.location.reload();

  
}
 ResetbtnClick(){
  this.ResetGameData_ ();
  //window.location.reload();
}
 DisplayDialog : boolean = false;
  ngOnInit()   {
 
   this.dorAimg = this.defaultImgsrc;
   this.dorBimg = this.defaultImgsrc;
   this.dorCimg = this.defaultImgsrc;
    this.ResetGameData_();
     this.getAlldata();
     this.GetRandomCarPos();
    
   //await this.api.getNextDortoOpen().subscribe((data :any) => { this.nextopen = data; });
  
   

   
 }

  GetRandomCarPos(){
 
  try{
    this.api.getCarIN().subscribe(responce => { this.Carin = responce.toString() });
   // window.alert(this.Carin);
  }
  catch(error){
    console.log(error);
  }

  
 }
 SwithSelection()  :void{
  this.closeDialog();
  const doors =["A","B","C"];
  const IndexofClickedDor = doors.indexOf(this.ClickedDorID);
  const IndexofOpendDOr = doors.indexOf(this.nextopen);
  if(IndexofClickedDor !== -1){
    doors.splice(IndexofClickedDor,1);
  }
  if(IndexofOpendDOr !== -1){
  doors.slice(IndexofOpendDOr,1);
  }
  //window.alert(doors.at(0));
   const dorname = doors[0].toString();
   this.openWInDor();
  this.api.perfomAction("Switch",dorname).subscribe(responce => { window.alert(responce.toString()) });
  this.getAlldata();
  //this.closeDialog();
 }

 KeepSelection () : void 
 {
  this.closeDialog();
  this.openWInDor();
  this.api.perfomAction("Keep",this.ClickedDorID).subscribe(responce => { window.alert(responce.toString()) });
  this.getAlldata();
 }

 opendialog() :void
 {
  if(this.DisplayDialog == false){
    this.DisplayDialog = true;
  }
 }
 closeDialog() :void {
  if(this.DisplayDialog == true){
    this.DisplayDialog = false;
  }
 }
 openWInDor()
 {
  const imgElement = document.getElementById(this.Carin) as HTMLImageElement;
  if (imgElement) {
    imgElement.src = this.carimg;
  }
 }
 OpenaDorAfterClick() : void
 {
   const imgElement = document.getElementById(this.nextopen) as HTMLImageElement;
   if (imgElement) {
     imgElement.src = this.goatimg;
   }
 }
 
 GetClickedDor(event: MouseEvent)
 {
   this.ClickedDorID = (event.target as HTMLImageElement).id;
  // window.alert("You opened the door " + this.ClickedDorID);
   
 }
 CardOnclick (event: MouseEvent): void {
  this.GetClickedDor(event);
  this.getNextOpenDor();
  this.OpenaDorAfterClick();
  
   this.opendialog();
   
   if(this.Carin == "A"){
     //this.dorAimg = this.carimg;
   }
   if(this.goatin.includes("B")==true){
    // this.dorBimg = this.goatimg;
   }

        //this.defaultImgsrc = "../../assets/img/car.png";
 }

 RepeatAction  ( event :MouseEvent)
 {
  //const numericRegex = @'/^\d+$/';
  //if(numericRegex.test(this.txtcount))
  //{
  this.api.RepeatAct(this.selectedopt,this.txtcount);
  //window.alert(this.selectedopt)
  //}
  this.getAlldata();
     
 }

}
