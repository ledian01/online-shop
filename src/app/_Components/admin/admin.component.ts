import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from "@angular/router";
import {PolicyService} from "../../policy.service";
import {FormControl, FormGroup} from "@angular/forms";


class Products {
  id: any
  name: any
  category: string | undefined
  price: string | undefined
  size: string | undefined
  description: string | undefined
  image: any;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productsArray: any[] = [];
  closeResult = '';

  formGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    size: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private firestore: AngularFirestore,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private policyService: PolicyService) {
  }

  ngOnInit(): void {
    this.firestore.collection('all-products')
      .get().subscribe(snaps => {
        this.productsArray = [];
        snaps.forEach(snap => {
            this.productsArray.push({...snap.data() as Products, id: snap.id});
          }
        )
      }
    )
  }

  open(content: any, productId: string) {

    const prod = this.productsArray.find(x => x.id === productId);
    this.formGroup.patchValue(prod);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
  }


  update(productId: string) {
    this.policyService.updatePolicy(productId, this.formGroup.value);
    const index = this.productsArray.findIndex(x => x.id === productId);
    this.productsArray.splice(index, 1, this.formGroup.value);
  }

  delete(id: string) {
    const prodIndex = this.productsArray.findIndex(x => x.id == id);
    this.productsArray.splice(prodIndex, 1);
    this.policyService.deletePolicy(id);
  }
}


