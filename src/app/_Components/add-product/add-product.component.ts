import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {PolicyService} from "../../policy.service";
import {Router} from "@angular/router";



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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    size: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  productsArray: any[] = [];

  constructor(private firestore: AngularFirestore,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private policyService: PolicyService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.firestore.collection('all-products')
      .get().subscribe(snaps => {
        this.productsArray = [];
        snaps.forEach(snap => {
            // @ts-ignore
            this.productsArray.push({...snap.data(), id: snap.id} as Products);
          }
        )
      }
    )
  }

  create() {
    this.policyService.createPolicy(this.createForm.value);
    this.router.navigate(["/admin"]);
  }


}
