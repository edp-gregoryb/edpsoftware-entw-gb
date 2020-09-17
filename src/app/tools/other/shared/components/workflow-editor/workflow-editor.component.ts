import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ng2-cookies';

/*
  erst mit Angular v7 moeglich:
  //import { moveItemInArray } from '@angular/cdk/drag-drop';
  
  wenn auf Angular v7 umgeschaltet ist koennen in workflow-editor.component.html alle kommentare die etwas mit cdk enthalten
  den jeweiligen divs hinzugefuegt werden und in workflow-editor.component.ts ca ab Zeile 430 bei den auskommentierten Methoden
  die Kommentare entfernt werden. Dadurch koennen die Workflows im Editor per Drag-And-Drop bedient werden
*/

import { WorkflowService } from '../../services/workflow.service';
import { RestAufgabeService } from '../../rest-services/rest-aufgabe.service';
import { RestAufgabengruppeService } from '../../rest-services/rest-aufgabengruppe.service';
import { RestSchrittService } from '../../rest-services/rest-schritt.service';
import { RestProzessService } from '../../rest-services/rest-prozess.service';

import { NewworkflowdialogComponent } from  '../../dialogs/newworkflowdialog/newworkflowdialog.component';
import { DeleteworkflowdialogComponent } from  '../../dialogs/deleteworkflowdialog/deleteworkflowdialog.component';
import { DiscardworkflowdialogComponent } from  '../../dialogs/discardworkflowdialog/discardworkflowdialog.component';

import { Workflow } from '../../entities/Workflow';
import { Step } from '../../entities/Step';
import { Task } from '../../entities/Task';
import { Todo } from '../../entities/Todo';

@Component({
  selector: 'app-workflow-editor',
  templateUrl: './workflow-editor.component.html',
  styleUrls: ['./workflow-editor.component.css']
})
export class WorkflowEditorComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerTitle:          string  = "Workflow-Editor";
  headerLinkBack:       string  = "workflow/workflow-show";
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  workflowVorhanden:    boolean = false; //wird ein workflow momentan angezeigt?
  minwidth:             number; //minimale breite des momentanen workflows
  
  editWorkflow:boolean = false; //schon bestehender workflow editieren (1) oder neuen erstellen auf vorlage basierend (0)
  
  stepwidth:            number  = 300;
  
  //alle workflows
  workflows:            Workflow[];
  
  //speichern den momentanen workflow
  workflow:             Workflow;
  steps:                Step[]      = [];
  tasks:                Task[][]    = [];
  todos:                Todo[][][]  = [];
  
  //default-entities fuer die erweiterung des momentanen workflows
  defaultWorkflow:      Workflow    = { prozessid: undefined, stat: '', gruppe: '', bez: '', beschreibung: '' };
  defaultStep:          Step        = { schrittid: undefined, prozessid: undefined, reihenfolge: undefined, bez: '', beschreibung: '', stat: '', defaultVerantwortlicher: undefined };
  defaultTask:          Task        = { aufgabengruppeid: undefined, schrittid: undefined, reihenfolge: undefined, bez: '', beschreibung: '', stat: '', defaultVerantwortlicher: undefined };
  defaultTodo:          Todo        = { aufgabeid: undefined, aufgabengruppeid: undefined, reihenfolge: undefined, bez: '', beschreibung: '', stat: '' };
  
  //login
  loginparameter:       any;
  
  innerheight:          number;
  
  constructor(private dialog: MatDialog,
              private restSchrittService: RestSchrittService,
              private router: Router,
              private workflowService: WorkflowService,
              private restAufGrupService: RestAufgabengruppeService,
              private restAufgabeService: RestAufgabeService,
              private restProzessService: RestProzessService,
              private cookieService: CookieService, ) {
  }

  ngOnInit() {
    this.innerheight = self.innerHeight - 160;
    
    //header sachen laden
    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if(tempfilelocalstorage) {
      let userjson = JSON.parse(atob(tempfilelocalstorage));
      
      let licensedModulestemp  = userjson[0].module;
      
      for (let row of  licensedModulestemp){
        this.licensedModules.push(row);
        if (row.shorthand == this.currentAppModule){
          this.modulename = row.name;
        }
        
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      
      //keine berechtigung fuer den workfloweditor -> zurueck zur uebersicht
      let berecht = false;
      for(let i = 0; i < userjson[0].berecht.length; i++) {
        if(userjson[0].berecht[i] === 'VLPD'){
          berecht = true;
        }
      }
      if(!berecht){
        //zurueck zur uebersicht (muss noch verbessert werden, denn mit schlechter interverbindung gibt es ein ViewDestroyedError)
        setTimeout(() => {
          this.router.navigate([this.headerLinkBack]);
        }, 200);
        return;
      }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    }
    
    //anderes laden
    //laedt workflows
    this.httpRequestsLoading++;
    this.restProzessService.getAllProzess()
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.workflows = ret;
      }, err => {
        console.log(err);
    });
  } //ende ngOnInit()
  
  //gibt boolean zurueck ob bezeichnung schon von einem anderen Workflow benutzt wird
  titleAlreadyUsed(): boolean {
    for(let i = 0; i < this.workflows.length; i++){
      if(this.workflows[i].bez === this.workflow.bez){
        return true;
      }
    }
    return false;
  } //ende titleAlreadyUsed()
  
  //laedt neuen workflow nach vorlage
  newWorkflow(): void {
    //oeffnet dialog-fenster, bei dem der user die vorlage bestimmen kann
    const dialogRef = this.dialog.open(NewworkflowdialogComponent, {
      width: '350px',
      data: [{ vorlage: undefined, edit: true }, this.workflows]
    });
    
    //dialogfenster wird geschlossen
    dialogRef.afterClosed()
      .subscribe(result => {
        //falls etwas selektiert wurde wird workflow generiert, ansonsten passiert nicths
        if(result && result.vorlage){
          
          //wird ein workflow editiert oder ein neuer erstellt
          this.editWorkflow = result.edit;
          
          //result = prozessid des workflow, der als vorlage genutzt werden will
          if(result.vorlage === '-1'){ //leere vorlage ausgewaehlt
            this.workflow = this.defaultWorkflow;
            this.editWorkflow = false;
            this.workflowVorhanden = true;
            this.minwidth = this.stepwidth + 22;
          } else { //einen schon vorhandenen workflow als vorlage nutzen
            this.minwidth = this.stepwidth + 22;
            
            //laedt workflow
            this.httpRequestsLoading++;
            this.restProzessService.getProzess(result.vorlage)
              .subscribe( ret => {
                this.httpRequestsLoading--;
                this.workflowVorhanden = true;
                this.workflow = ret[0];
                this.httpRequestsLoading++;
                this.restSchrittService.getAllSchritt(this.workflow.prozessid)
                  .subscribe( ret => {
                    this.httpRequestsLoading--;
                    var stepsBuffer = ret;
                    stepsBuffer.sort((a, b) => (a.reihenfolge > b.reihenfolge) ? 1 : -1);
                    for(let i = 0; i < stepsBuffer.length; i++){
                      if(i >= 1){
                        for(let j = stepsBuffer[i-1].reihenfolge; j < stepsBuffer[i].reihenfolge - 1; j++) {
                          this.addEmpty();
                        }
                      } else {
                        for(let j = 0; j < stepsBuffer[i].reihenfolge; j++){
                          this.addEmpty();
                        }
                      }
                      this.addStep(stepsBuffer[i]); //speichert die bezeichnung der steps
                    }
                    
                    //this.steps.sort((a, b) => (a.reihenfolge > b.reihenfolge) ? 1 : -1);
                    
                    for(let i = 0; i < this.steps.length; i++){  
                      if(this.steps[i]){
                        //laedt alle dazugehoerenden tasks
                        this.httpRequestsLoading++;
                        this.restAufGrupService.getAllAufgabengruppe(this.steps[i].schrittid)
                          .subscribe( ret => {
                            this.httpRequestsLoading--;
                            var tasksBuffer = ret;
                            for(let j = 0; j < tasksBuffer.length; j++){
                              this.addTask(tasksBuffer[j], i); //speichert die bezeichnung der tasks
                            }
                            
                            this.tasks[i].sort((a, b) => (a.reihenfolge > b.reihenfolge) ? 1 : -1);
                              
                            for(let j = 0; j < this.tasks[i].length; j++){  
                              //laedt alle dazugehoerenden todos
                              this.httpRequestsLoading++;
                              this.restAufgabeService.getAllAufgabe(this.tasks[i][j].aufgabengruppeid)
                                .subscribe( ret => {
                                  this.httpRequestsLoading--;
                                  var todosBuffer = ret;
                                  for(let p = 0; p < todosBuffer.length; p++){
                                    this.addTodo(todosBuffer[p], i, j); //speichert die titel der todos
                                  }
                                  this.todos[i][j].sort( (a, b) => (a.reihenfolge > b.reihenfolge) ? 1 : -1);
                                }, err => {
                                  console.log(err);
                              });
                            }
                          }, err => {
                            console.log(err);
                        });
                      }
                    }
                  }, err => {
                    console.log(err);
                });
              }, err => {
                console.log(err);
            });
          }
        }
    });
  } //ende newWorkflow()
  
  //speichert den momentanen Workflow
  saveWorkflow(): void {
    
    if(this.editWorkflow === true){
      this.workflowService.updateProzess(this.workflow, this.steps, this.tasks, this.todos);
    } else {
      this.workflowService.addProzess(this.workflow, this.steps, this.tasks, this.todos);
    }
    
    //this.dataService.updateStuff();
    this.router.navigate([this.headerLinkBack]);
  } //ende saveWorkflow()
  
  //verwirft momentanen workflow
  cancleWorkflow(): void {
    const dialogRef = this.dialog.open(DiscardworkflowdialogComponent, {
      width: '350px',
      data: {}
    });
    
    //pop-up wird geschlossen
    dialogRef.afterClosed()
      .subscribe( result => {
        //workflow wird wirklich verworfen
        if(result === true){
          //workflow wird nicht mehr angezeigt
          this.workflowVorhanden = false;
          
          //variablen werden zurueckgesetzt
          this.workflow = undefined;
          this.steps = [];
          this.tasks = [];
          this.todos = [];
        }
    });
  } //ende cancleWorkflow()
  
  //loescht den momentanen workflow
  deleteWorkflow(): void {
    const dialogRef = this.dialog.open(DeleteworkflowdialogComponent, {
      width: '250px',
      data: { titel: this.workflow.bez }
    });
    
    //pop-up wird geschlossen
    dialogRef.afterClosed()
      .subscribe(result => {
        //workflow wird wirklich geloescht
        if(result === true){
          this.httpRequestsLoading++;
          this.restProzessService.deleteProzess(this.workflow.prozessid)
            .subscribe( ret => {
              this.httpRequestsLoading--;
              //this.dataService.updateStuff();
              this.router.navigate([this.headerLinkBack]);
            }, err => {
              console.log(err);
          });
        }
    });
  } //ende deleteWorkflow()
  
  //fuegt dem momentanen workflow ein todo hinzu
  addTodo(_input, i, j): void {
    let todo;
    if(_input.aufgabeid){
      todo = _input;
    } else {
      todo = JSON.parse(JSON.stringify(this.defaultTodo));
      todo.bez = _input.bez;
    }
    
    //erweitert todos mit einem default-todo und dem vom user eingegebenen titel
    this.todos[i][j].push(todo);
  } //ende addTodo()
  
  //fuegt dem momentanen workflow ein task hinzu
  addTask(_input, i): void {
    let task;
    if(_input.aufgabengruppeid) {
      task = _input;
    } else {
      task = JSON.parse(JSON.stringify(this.defaultTask));
      task.bez = _input.bez;
    }
    
    //erweitert todos mit einem default-todo und dem vom user eingegebenen titel
    this.tasks[i].push(task);
    //erweitert todo-array
    this.todos[i].push([]);
  } //ende addTask()
  
  //fuegt dem momentanen workflow ein schritt hinzu
  addStep(_input): void {
    let step;
    if(_input.schrittid){
      step = _input;
    } else {
      step = JSON.parse(JSON.stringify(this.defaultStep));
      step.bez = _input.bez;
    }
    
    //erweitert todos mit einem default-todo und der vom user eingegebene bezeichnung
    this.steps.push(step);
    //erweitert task- und todo-array
    this.tasks.push([]);
    this.todos.push([]);
    
    this.minwidth += this.stepwidth + 22;
  } //ende addStep()
  
  addEmpty(): void {
    this.steps.length++;
    this.tasks.push([]);
    this.todos.push([]);
    this.minwidth += this.stepwidth + 22;
  }
  
  //loescht einen todo
  deleteTodo(i, j, p): void {
    this.todos[i][j].splice(p, 1);
  } //ende deleteTodo()
  
  //loescht einen task
  deleteTask(i, j): void {
    //loescht task und dessen todos
    this.tasks[i].splice(j, 1);
    this.todos[i].splice(j, 1);
  } //ende deleteTask()
  
  //loescht einen schritt
  deleteStep(i): void {
    //loescht schritt, dessen tasks und dessen todos
    this.steps.splice(i, 1);
    this.tasks.splice(i, 1);
    this.todos.splice(i, 1);
    
    this.minwidth -= this.stepwidth + 22;
  } //ende deleteStep()
  
  //bewegt eine todo
  todoMove(i, j, p, move): void {
    //return wenn todo sicht nicht bewegen kann (zuoberst/zuunterst)
    if(p + move < 0 || this.todos[i][j].length <= p + move){
      return;
    }
    
    this.todos[i][j] = swap(this.todos[i][j], p, p + move);
  } //ende todoMove()
  
  //bewegt einen task
  taskMove(i, j, move): void {
    if(j + move < 0 || this.tasks[i].length <= j + move){
      return;
    }
    
    this.tasks[i] = swap(this.tasks[i], j, j + move);
    this.todos[i] = swap(this.todos[i], j, j + move);
  } //ende taskMove()
  
  //bewegt einen step
  stepMove(i, move): void {
    if(i + move < 0 || this.steps.length <= i + move){
      return;
    }
    
    this.steps = swap(this.steps, i, i + move);
    this.tasks = swap(this.tasks, i, i + move);
    this.todos = swap(this.todos, i, i + move);
  } //ende stepMove()
  
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }
  
  
  //erst mit Angular v7 moeglich
  /*//verschiebt einen schritt (inklusive dessen tasks und todos)
  onDropStep(event: any) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  } //ende onDropStep()
  
  //verschiebt einen task (inklusive dessen todos)
  onDropTask(event: any, i: number) {
    moveItemInArray(this.tasks[i], event.previousIndex, event.currentIndex);
    moveItemInArray(this.todos[i], event.previousIndex, event.currentIndex);
  } //ende onDropTask()
  
  //verschiebt einen todo
  onDropTodo(event: any, i: number, j: number) {
    moveItemInArray(this.todos[i][j], event.previousIndex, event.currentIndex);
  } //ende onDropTodo()*/
} //ende class WorkflowEditorComponent

//tauscht zwei elemente eines arrays aus
function swap(_arr, x, y){
  let buffer = _arr[x];
  _arr[x] = _arr[y];
  _arr[y] = buffer;
  return _arr;
} //ende swap()
