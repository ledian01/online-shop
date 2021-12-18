import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

class Products {
  id: any
  name: any
  category: string | undefined
  price: string | undefined
  size: string | undefined
  description: string | undefined
  image: any;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private firestore: AngularFirestore) { }

  createPolicy(policy: Products){
    return this.firestore.collection('all-products').add(policy);
  }

  updatePolicy(productId: string, data: any){
    this.firestore.doc('all-products/' + productId).update(data)
  }

  deletePolicy(policyId: string){
    this.firestore.doc('all-products/' + policyId).delete();
  }
}
