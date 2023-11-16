import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.scss']
})

export class ProductcrudComponent implements OnInit {


  ProductcrudComponent : any[] = [];
  isResultLoaded = false;
  isUpadateFormActive = false;

    category: string = "";
    nomeproduto: string = "";
    valorproduto: number = 0;
    datavencimento: Date | null = null;
    quantidadeestoque: number = 0;
    produtoperecivel: boolean = false;
  ProductArray: any;

  constructor(private http: HttpClient){
    this.getAllProduct();
   }

  ngOnInit(): void {
      
  }

  getAllProduct()
  {

    this.http.get("http://127.0.0.1:8000/api/products")

    .subscribe((resultData: any)=>
    {
      this.isResultLoaded = true;
      console.log(resultData);
      this.ProductArray = resultData;
    });
  }

  register()
  {

    let bodyData = {
      "category" : this.category,
      "nomeproduto" : this.nomeproduto,
      "valorproduto" : this.valorproduto,
      "datavencimento" : this.datavencimento,
      "quantidadeestoque" : this.quantidadeestoque,
      "produtoperecivel": this.produtoperecivel
    };

    this.http.post("http://127.0.0.1:8000/api/save", bodyData).subscribe((resultData: any)=> 
    {
      console.log(resultData);
      alert("Product Registered Successfully")
      this.getAllProduct();
      this.category = "";
      this.nomeproduto = "";
      this.valorproduto = 0;
      this.datavencimento  = null;
      this.quantidadeestoque = 0;
      this.produtoperecivel = false;
    });
  }


  setUpdate(data: any)
  {
      this.category = data.category;
      this.nomeproduto = data.nomeproduto;
      this.valorproduto = data.valorproduto;
      this.datavencimento  = data.datavencimento;
      this.quantidadeestoque = data.quantidadeestoque;
      this.produtoperecivel = data.produtoperecivel;
  }

  UpdateRecords()
  {
    let bodyData = {
      "category" : this.category,
      "nomeproduto" : this.nomeproduto,
      "valorproduto" : this.valorproduto,
      "datavencimento" : this.datavencimento,
      "quantidadeestoque" : this.quantidadeestoque,
      "produtoperecivel": this.produtoperecivel
    };


     this.http.put("http://127.0.0.1:8000/api/updates", bodyData).subscribe((resultData: any)=> 
    {
      console.log(resultData);
      alert("Product Registered Updated")
      this.getAllProduct();
      this.category = "";
      this.nomeproduto = "";
      this.valorproduto = 0;
      this.datavencimento  = null;
      this.quantidadeestoque = 0;
      this.produtoperecivel = false;
    });
  }


  save()
  {  
    this.register();
  }


   setDelete(data: any)
   {
    this.http.delete("http://127.0.0.1:8000/api/destroys"+ "/" + data.id).subscribe((resultData: any)=> 
    {
      console.log(resultData);
      alert("Product Deleted")
      this.getAllProduct();
   });

 }
}