import { Component, OnInit } from '@angular/core';

//Firebase Imports
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

//Alert Controller Import
import { AlertController } from '@ionic/angular';



interface QueueData
{
  Name: string;
  Age: number;
  Address: string;
  queue_pos: number;
}

interface QueueCounter
{
  queue_counter: number;
}



@Component({
  selector: 'app-add-to-queue',
  templateUrl: './add-to-queue.page.html',
  styleUrls: ['./add-to-queue.page.scss'],
})
export class AddToQueuePage {

  
  queueList = []; //Array for the information of Queue
  counterList = []; //Array that will contain the queue counter data

  queueData: QueueData;
  queueForm: FormGroup;

  queueNum: number; //Queue number to add to database
  newQueueNum: number; //Updated Queue Number to add after a record is sent to database

  constructor
  (
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private afs: AngularFirestore,
    private alertController: AlertController,
  ) 
  { 
    this.queueData = {} as QueueData;
  }
  

  ngOnInit() 
  {

    //Async Function to load available queue number
    this.firebaseService.read_counter().subscribe(data => 
    {
      //Assign queue counter values to counterlist array
      this.counterList = data.map(e => {
        return {
          id: e.payload.doc.id,
          queue_counter: e.payload.doc.data()['queue_counter'],
        }
      })
      
      //Get counter Data from counterlist array and assign to variable queuenum
      this.queueNum = this.counterList[0].queue_counter
      
      //Put formgroup inside async function to allow to get the value of queuenum
      this.queueForm = this.fb.group
      ({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Sex: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      queue_pos: [this.queueNum, ],
      current: [false, ]
      })

    })

    //Load Formgroup
    this.queueForm = this.fb.group
    ({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Sex: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      queue_pos: [ ],
      current: [false, ]
    })

  }

  

  CreateRecord() {

    // Add Input Data to Firestore Database
    this.firebaseService.insert_to_queue(this.queueForm.value).then(resp => {
      this.UpdateCount();
      this.addSuccess();
      this.queueForm.reset();
    })
      .catch(error => {
        console.log(error);
      })
  }

  UpdateCount() 
  {
    this.newQueueNum = this.queueForm.value['queue_pos'];
    this.newQueueNum = this.newQueueNum + 1
    let record = {};
    record['queue_counter'] = this.newQueueNum;
    this.firebaseService.increase_counter(record);
  }
  
  async addSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Insert to Queue',
      message: 'Added to Queue Successfully',
      buttons: ['OK']
    });

    await alert.present();
  }

  
  


}
