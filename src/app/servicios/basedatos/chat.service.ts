import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Message {
  id?: string;
  text: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  sendMessage(message: Message) {
    return this.firestore.collection('messages').add(message);
  }

  getMessages(): Observable<Message[]> {
    return this.firestore.collection<Message>('messages', ref => ref.orderBy('createdAt')).valueChanges();
  }
}
