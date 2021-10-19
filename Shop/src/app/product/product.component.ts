import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  //принимаем с главного компонента продукты
  @Input() product

  constructor() { }

  ngOnInit(): void {
  }

}
