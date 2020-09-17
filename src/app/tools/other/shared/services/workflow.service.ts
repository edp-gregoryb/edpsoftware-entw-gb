import { Injectable } from '@angular/core';

import { RestProzessService } from '../rest-services/rest-prozess.service';
import { RestSchrittService } from '../rest-services/rest-schritt.service';
import { RestAufgabengruppeService } from '../rest-services/rest-aufgabengruppe.service';
import { RestAufgabeService } from '../rest-services/rest-aufgabe.service';

import { Workflow } from '../entities/Workflow';
import { Step } from '../entities/Step';
import { Task } from '../entities/Task';
import { Todo } from '../entities/Todo';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  
  constructor(private restProzessService: RestProzessService,
              private restSchrittService: RestSchrittService,
              private restAufGrupService: RestAufgabengruppeService,
              private restAufgabeService: RestAufgabeService) {
  }
  
  //ersetzt im array (arr) in allen objekten in allen strings alle " durch \"
  sanitizeInput(arr: any[]) {
    for(let i = 0; i < arr.length; i++){
      if(arr[i]){
        for(var prop in arr[i]){
          if(typeof arr[i][prop] === 'string'){
            arr[i][prop] = arr[i][prop].replace(/"/g, '\\"');
          }
        }
      }
    }
    
    return arr;
  } //ende sanitizeInput()
  
  //fuegt einen Workflow hinzu
  addProzess(_workflow: Workflow, _steps: Step[], _tasks: Task[][], _todos: Todo[][][]){
    //ersetzt alle " durch '
    _workflow = this.sanitizeInput([_workflow])[0];
    _steps = this.sanitizeInput(_steps);
    for(let i = 0; i < _steps.length; i++){
      _tasks[i] = this.sanitizeInput(_tasks[i]);
      for(let j = 0; j < _tasks[i].length; j++){
        _todos[i][j] = this.sanitizeInput(_todos[i][j]);
      }
    }
    
    //hinzufuegen
    this.restProzessService.addProzess(_workflow)
      .subscribe(ret => {
        //fuer alle schritte
        for(let i = 0; i < _steps.length; i++){
          if(_steps[i]){
            _steps[i].prozessid = ret[0].prozessid;
            _steps[i].reihenfolge = i;
            //schritt hinzufuegen
            this.restSchrittService.addSchritt(_steps[i])
              .subscribe(ret => {
                //fuer alle aufgabengruppen dieses schrittes
                for(let j = 0; j < _tasks[i].length; j++){
                  _tasks[i][j].schrittid = ret[0].schrittid;
                  _tasks[i][j].reihenfolge = j;
                  //aufgabengruppe hinzufuegen
                  this.restAufGrupService.addAufgabengruppe(_tasks[i][j])
                    .subscribe( ret => {
                      //fuer alle aufgaben dieser aufgabengruppe
                      for(let p = 0; p < _todos[i][j].length; p++){
                        _todos[i][j][p].aufgabengruppeid = ret[0].aufgabengruppeid;
                        _todos[i][j][p].reihenfolge = p;
                        //aufgabe hinzufuegen
                        this.restAufgabeService.addAufgabe(_todos[i][j][p])
                          .subscribe( ret => {
                          }, err => {
                            console.log(err);
                        });
                      }
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
  } //ende addProzess()
  
  //updated einen Workflow
  updateProzess(_workflow: Workflow, _steps: Step[], _tasks: Task[][], _todos: Todo[][][]){
    
    //ersetzt alle " durch '
    _workflow = this.sanitizeInput([_workflow])[0];
    _steps = this.sanitizeInput(_steps);
    for(let i = 0; i < _steps.length; i++){
      _tasks[i] = this.sanitizeInput(_tasks[i]);
      for(let j = 0; j < _tasks[i].length; j++){
        _todos[i][j] = this.sanitizeInput(_todos[i][j]);
      }
    }
    
    //hinzufuegen
    //prozess updaten
    this.restProzessService.updateProzess(_workflow)
      .subscribe( ret => {
        var prozess = ret[0];
        //alle geloeschten schritte loeschen
        this.restSchrittService.getAllSchritt(prozess.prozessid)
          .subscribe( ret => {
            //ueberfluessige schritte loeschen
            var beSteps = ret; //be === backend
            for(let i = 0; i < beSteps.length; i++){
              var found = false;
              for(let j = 0; j < _steps.length; j++){
                if(_steps[j]){
                  if(_steps[j].schrittid && _steps[j].schrittid === beSteps[i].schrittid){
                    found = true;
                  }
                }
              }
              //nicht mehr vorhanden...
              if(!found){
                //..loeschen
                this.restSchrittService.deleteSchritt(beSteps[i].schrittid)
                  .subscribe( ret => {
                  }, err => {
                    console.log(err);
                });
              }
            }
          }, err => {
            console.log(err);
        });
        //alle schritte updaten
        for(let i = 0; i < _steps.length; i++){
          if(_steps[i]){
            if(!_steps[i].schrittid){
              _steps[i].schrittid = 0;
              _steps[i].prozessid = prozess.prozessid;
            }
            _steps[i].reihenfolge = i;
            //schritt updaten
            this.restSchrittService.updateSchritt(_steps[i])
              .subscribe( ret => {
                var schritt = ret[0];
                //alle geloeschten aufgabengruppen loeschen
                this.restAufGrupService.getAllAufgabengruppe(schritt.schrittid)
                  .subscribe( ret => {
                    //ueberfluessige aufgabengruppen loeschen
                    var beAufGrup = ret; //be === backend
                    for(let j = 0; j < beAufGrup.length; j++){
                      var found = false;
                      for(let p = 0; p < _tasks[i].length; p++){
                        if(_tasks[i][p].aufgabengruppeid && _tasks[i][p].aufgabengruppeid === beAufGrup[j].aufgabengruppeid){
                          found = true;
                        }
                      }
                      //nicht mehr vorhanden...
                      if(!found){
                        //..loeschen
                        this.restAufGrupService.deleteAufgabengruppe(beAufGrup[j].aufgabengruppeid)
                          .subscribe( ret => {
                          }, err => {
                            console.log(err);
                        });
                      }
                    }
                  }, err => {
                    console.log(err);
                });
                //alle aufgabengruppen updaten
                for(let j = 0; j < _tasks[i].length; j++){
                  if(!_tasks[i][j].aufgabengruppeid){
                    _tasks[i][j].aufgabengruppeid = 0;
                    _tasks[i][j].schrittid = schritt.schrittid;
                  }
                  _tasks[i][j].reihenfolge = j;
                  //aufgabegruppe updaten
                  this.restAufGrupService.updateAufgabengruppe(_tasks[i][j])
                    .subscribe( ret => {
                      var retTask = ret[0];
                      //alle geloeschten aufgabengruppen loeschen
                      this.restAufgabeService.getAllAufgabe(retTask.aufgabengruppeid)
                        .subscribe( ret => {
                          //ueberfluessige aufgaben loeschen
                          var beAufgabe = ret; //be === backend
                          for(let w = 0; w < beAufgabe.length; w++){
                            var found = false;
                            for(let q = 0; q < _todos[i][j].length; q++){
                              if(_todos[i][j][q].aufgabeid && _todos[i][j][q].aufgabeid === beAufgabe[w].aufgabeid){
                                found = true;
                              }
                            }
                            //nicht mehr vorhanden...
                            if(!found){
                              //..loeschen
                              this.restAufgabeService.deleteAufgabe(beAufgabe[w].aufgabeid)
                                .subscribe( ret => {
                                }, err => {
                                  console.log(err);
                              });
                            }
                          }
                        }, err => {
                          console.log(err);
                      });
                      //alle aufgaben updaten
                      for(let p = 0; p < _todos[i][j].length; p++){
                        if(!_todos[i][j][p].aufgabeid){
                          _todos[i][j][p].aufgabeid = 0;
                          _todos[i][j][p].aufgabengruppeid = retTask.aufgabengruppeid;
                        }
                        _todos[i][j][p].reihenfolge = p;
                        //aufgabe updaten
                        this.restAufgabeService.updateAufgabe(_todos[i][j][p])
                          .subscribe( ret => {
                            var todo = ret[0];
                          }, err => {
                            console.log(err);
                        }); //ende aufgabe updaten
                      }
                    }, err => {
                      console.log(err);
                  }); //ende aufgabegruppe updaten
                }
              }, err => {
                console.log(err);
            });//ende schritt updaten
          }
        }
      }, err => {
        console.log(err);
    });//ende prozess updaten
  } //ende updateProzess()
}
