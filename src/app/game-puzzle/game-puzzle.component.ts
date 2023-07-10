import { Component } from '@angular/core';
import { GameserviceService } from '../gameservice.service';
import { map } from 'rxjs';
import { from } from 'rxjs';
import { Location } from '@angular/common';

@Component(
  {
    selector: 'app-game-puzzle',
    templateUrl: './game-puzzle.component.html',
    styleUrls: ['./game-puzzle.component.css', '../../../bootstrap/bootstrap.min.css']

  })
export class GamePuzzleComponent {
  constructor(private api: GameserviceService) { }
   
  loading_gif : string ="../../assets/img/loading.gif";
  doorimg: string = "../../assets/img/door.png";
  carimg: string = "../../assets/img/car.png";
  goatimg: string = "../../assets/img/goat.png";

  defaultImgsrc: string = this.doorimg; //door image as default image

  loading: boolean = true;
  isScreenBlurred: boolean = false;

  

  dorAimg: string = "";
  dorBimg: string = "";
  dorCimg: string = "";

  txtcount: string = "";
  selectedopt: string = "Switch";

  nextopen: string = "";  //open this dor after click -- store here the data from api return as next to open
  Carin: string = "";     //store random dor -- car behind 


  goatin = ["B", "C"];



  ClickedDorID: string = "";


  gamedata: any;
  Wins: number = 1;
  Play: number = 2;

  async getAlldata() {
    this.isScreenBlurred = true;
    const promise = this.api.getalldata();
    from(promise).subscribe(data => { this.gamedata = data; this.isScreenBlurred=false; });
  }

  async GetRandomCarPos() {

    const promise = this.api.getCarIN();
    from(promise).subscribe(responce => { this.Carin = responce.toString(); this.loading = false; });
    //window.alert(this.Carin);
  }
  async getNextOpenDor() {
    
    this.api.getNextDortoOpen(this.ClickedDorID).subscribe(data => { this.nextopen = data.toString(); this.checkLoadingState();  });
  }

  resetimgs() 
  {
    const imgElementA = document.getElementById("A") as HTMLImageElement;
    const imgElementB = document.getElementById("B") as HTMLImageElement;
    const imgElementC = document.getElementById("C") as HTMLImageElement;
    if (imgElementA) {
      imgElementA.src = this.defaultImgsrc;
    }
    if (imgElementB) {
      imgElementB.src = this.defaultImgsrc;
    }
    if (imgElementC) {
      imgElementC.src = this.defaultImgsrc;
    }

  }
  ResetGameData_() {
    
    this.gamedata = null;
    this.api.ResetGameData().subscribe(data => { console.log(data.toString()); 
      this.getAlldata(); });
    
    this.txtcount = "";
    this.selectedopt = "Switch";
    
    this.nextopen = "";
    this.Carin = "";
    this.dorAimg = this.defaultImgsrc;
    this.dorBimg = this.defaultImgsrc;
    this.dorCimg = this.defaultImgsrc;
    this.ClickedDorID = "";
    this.loading = true;
    this.resetimgs();
    this.GetRandomCarPos();
   
   // this.PrintVariables();
    //this.getAlldata();
    //window.location.reload();


  }

  PrintVariables(){
   
    const vb = "Door Image A = "+this.dorAimg+ " | Door Image B =  "+this.dorBimg+" | Door Image C = " + this.dorCimg +
     " | Random Car Pos = "+this.Carin+ " | Next Open Door Variable = " +this.nextopen+" Clicked door variable =" +this.ClickedDorID+ "";
    window.alert(vb);

  }

  ResetbtnClick() {
    this.ResetGameData_();
    //window.location.reload();
  }
  DisplayDialog: boolean = false;
  ngOnInit() {

    this.GetRandomCarPos();
    this.ResetGameData_();
    this.getAlldata();
    
    this.dorAimg = this.defaultImgsrc;
    this.dorBimg = this.defaultImgsrc;
    this.dorCimg = this.defaultImgsrc;
    //await this.api.getNextDortoOpen().subscribe((data :any) => { this.nextopen = data; });




  }


  SwithSelection(): void {
    this.closeDialog();
    const doors = ["A", "B", "C"];
    const IndexofClickedDor = doors.indexOf(this.ClickedDorID);
    const IndexofOpendDOr = doors.indexOf(this.nextopen);
    const newDoors = doors.filter((_, index) => index !== IndexofClickedDor && index !== IndexofOpendDOr);


    const dorname = newDoors.toString();

    //this.PrintVariables();
    //window.alert("Switched to dor = " +dorname);
    //window.alert("Arry = " +newDoors);
    
    this.openWInDor();
    this.api.perfomAction("Switch", dorname).subscribe(responce => { window.alert(responce.toString());
    this.getAlldata(); });
    
    //this.closeDialog();
  }

  KeepSelection(): void {
    this.closeDialog();
    this.openWInDor();
    this.api.perfomAction("Keep", this.ClickedDorID).subscribe(responce => { window.alert(responce.toString()); 
      this.getAlldata(); });
   
  }

  opendialog(): void {
    if (this.DisplayDialog == false) {
      if (this.Carin != "" && this.nextopen != "") {
        this.DisplayDialog = true;
        //window.alert("  < -- ####  " +this.nextopen +" | "+this.Carin);
      }
      else {
        window.alert("  < -- #### Data not received ### --> ");
      }

    }
  }
  closeDialog(): void {
    if (this.DisplayDialog == true) {
      this.DisplayDialog = false;
    }
  }
  openWInDor() {
    const imgElement = document.getElementById(this.Carin) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = this.carimg;
    }
  }
  OpenaDorAfterClick(): void {
    
      const imgElement = document.getElementById(this.nextopen) as HTMLImageElement;
      //window.alert(this.nextopen);
      if (imgElement) {
        imgElement.src = this.goatimg;
      }
    

  }

  GetClickedDor(event: MouseEvent) {
    this.ClickedDorID = (event.target as HTMLImageElement).id;
    // window.alert("You opened the door " + this.ClickedDorID);

  }
  checkLoadingState() {
    if (this.nextopen !=='') {

      this.isScreenBlurred = false;
      
      this.opendialog();
      this.OpenaDorAfterClick();
    }
  }
  CardOnclick(event: MouseEvent): void {
    
    this.GetClickedDor(event);
    this.getNextOpenDor();
    this.isScreenBlurred = true;
       
    
  }

  RepeatAction(event: MouseEvent) {
    const numericRegex = /^\d+$/;
    if(numericRegex.test(this.txtcount))
    {
    this.api.RepeatAct(this.selectedopt, this.txtcount).subscribe(data => console.log(data));
    //window.alert(this.selectedopt)
    }
    else{
      window.alert("count must be a number")
    }
    this.getAlldata();

  }

}
