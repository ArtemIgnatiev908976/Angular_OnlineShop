import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  //принимаем с главного компонента продукты
  @Input() product

  constructor(
    private productServ: ProductService
  ) {
  }

  ngOnInit(): void {
  }

  addProduct(product) {
    this.productServ.addProduct(product)
  }

}
