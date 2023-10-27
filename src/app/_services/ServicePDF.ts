import { Component, ViewChild, TemplateRef,  OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient,   } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})

export class PdfGenerationService {

  crecibo : number
  xcliente: string
  mtotal: number
  fcobro: string
  cpago: number
  ncliente : number
  msaldorestante: number
  xconceptopago: string
  paquete : string
  formadepago: string
  metrodosdepago=[]
  vendedor : number

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  async  getdatareceipt(crecibo: number, npaquete: string){
    
    this.crecibo = crecibo;
    this.paquete = npaquete;
  
      this.http.get(environment.apiUrl + '/api/v1/receipts/' + this.crecibo).subscribe((Receipt : any) => {
   
  
        const event = new Date(Receipt.data.receipt.fcobro);
  
        let fecha = event.toISOString();
  
        let formatofecha = fecha.slice(0,10).split('-');
  
        let nuevafecha = formatofecha[2] + '-' + formatofecha[1] + '-' + formatofecha[0]
  
  
        this.ncliente = Receipt.data.receipt.ncliente
        this.xcliente = Receipt.data.receipt.xcliente.toUpperCase()
        this.mtotal = Receipt.data.receipt.mtotal
        this.vendedor = Receipt.data.receipt.cvendedor
        this.xconceptopago = Receipt.data.receipt.xconceptopago.toUpperCase()
        this.msaldorestante = Receipt.data.receipt.msaldorestante
        this.fcobro = nuevafecha;
  
        this.metrodosdepago = []
        for(let i = 0; i < Receipt.data.receipt.distribucionpago.length; i++){
          this.metrodosdepago.push(
            // Receipt.data.receipt.distribucionpago[i].xmodalidad_pago.toUpperCase()
          );
        }
        this.formadepago = this.metrodosdepago.toString()

        this.generatePDF()
  
      });
    }
  
  async generatePDF() {

      const pdf =  await this.getdatareceipt

      const imageUrl = 'https://i.ibb.co/9HwCkpF/Logo-Negro.jpg';
    
      let imageBase64;
      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(response.data).toString('base64');
        imageBase64 = `data:image/jpg;base64,${imageData}`;
      } catch (error) {

        return;
      }
    
      const pdfDefinition = {
        info: 
        {
          title: `${this.xcliente + ' Recibo #' + this.crecibo}`,
        },
        content: 
        [
          {
            style: 'tableExample',
            table: 
            {
              body: 
              [
                [
                  {
                    image: imageBase64,
                    width: 150,
                    border: [false, false, false, false],
                    absolutePosition: { x:49, y:27 },
                  },
                  {
                    text: '', 
                    border: [false, false, false, false]
                  },
                  {
                    text: '', 
                    border: [false, false, false, false]
                  },
                  { 
                    border: [false, false, false, false],
                    absolutePosition: { x:385, y:17 },
                    table: 
                    {
                      body: 
                      [  
                        [
                          {text:' RECIBO\n Original',
                          background:'white',
                          fontSize: 10, 
                          bold: true,
                          alignment: 'center',
                          }
                        ],
                        [
                          {
                          text:'RECIBO: #' + this.crecibo, 
                          fontSize: 10, 
                          bold: true
                          }
                        ],
                        [
                          {
                          text:'CONTRATO: ' + this.paquete,
                            fontSize: 10, 
                            bold: true
                          }
                        ],
                      ],
                      alignment: "center"
                    },
                  },
                ],
                [
                  {
                    rowSpan: 3,
                    border: [true, false, false, false],
                    text: 'RECIBIMOS PAGO DE:\nLA CANTIDAD DE:\nPOR CONCEPTO DE PAGO:\nFORMA DE PAGO: \n',
                    margin:[3,65,0,0],
                    fontSize: 10,
                    lineHeight :2,
                    bold: true,
                  },
                  {
                    border: [false, true, false, false],
                    text: '',
                  },
                  {
                    border: [false, true, false, false],
                    text: '',
                  },
                  {
                    border: [false, true, true, false],
                    text: ''
                  }
                ],
                [
                  '',
                  {
                    colSpan: 3,
                    border: [false, false, true, false],
                    margin:[-30,59,0,0],                          
                    text: this.xcliente +'\n'+ this.mtotal +'\n'+this.xconceptopago +'\n'+ this.formadepago ,
                    fontSize: 10,
                    lineHeight :2
                  },
                  '',
                ],
                [
                  '',
                  {
                      text:'Fecha\n' + this.fcobro,
                      border: [true, true, true, true],
                      margin:[20,0,30,0],
                      fontSize: 10,
                      alignment: "center",
                  },
                  {
                      text:'Saldo Pendiente\n' + this.msaldorestante + ' Pesos',
                      alignment: '',
                      border: [true, true, true, true],
                      fontSize: 10,
                      margin:[10,0,20,0],
                  },
                  {
                      text:'',
                      border: [false, false, true, false],
                      margin:[50,0,0,0]
                  }
                ],
                [
                  {
                    border: [true, false, false, true],
                    table: 
                    {
                      body: 
                      [  
                        [
                          {
                          text:'',
                          background:'white',
                          fontSize: 10, 
                          bold: true,
                          border: [false, false, false, true],
                          }
                        ],
                        [
                          {
                            text:'FIRMA DEL CLIENTE',
                            alignment: 'center',
                            border: [false, false, false, false],
                            fontSize: 10,
                            margin:[0,0,0,20],
                          }
                        ],
                      ],
                    },
                
                  },
                  {
                      text:'',
                      alignment: 'center',
                      border: [false, true, false, true],
                      margin:[-200,0,0,20],
                  },
                  {
                      text:'',
                      border: [false, false, false, true],
                  },
                  {
                      
                  border: [false, false, true, true],
                    table: 
                    {
                      body: 
                      [  
                          
                        [
                          {
                            text:'',
                            background:'white',
                            fontSize: 10, 
                            bold: true,
                            border: [false, false, false, false],
                          }
                        ],
                        [
                          {
                            text:'FIRMA DEL VENDEDOR\n' + this.vendedor,
                            border: [false, true, false, false],
                            alignment: 'center',
                            fontSize: 10
                          }
                        ],
                      ],
                    },
                  }
                ],
              ]
            },
            layout: 
            {
              defaultBorder: false,
            }
          },
          {
            margin:[0,100,0,0],
            style: 'tableExample',
            table: 
            {
              body: 
              [
                [
                  {
                    image: imageBase64,
                    width: 150,
                    border: [false, false, false, false],
                    absolutePosition: { x:49, y:365 },
                  },
                  {
                    text: '', 
                    border: [false, false, false, false]
                  },
                  {
                    text: '', 
                    border: [false, false, false, false]
                  },
                  { 
                    border: [false, false, false, false],
                    absolutePosition: { x:385, y:363 },
                    table: 
                    {
                      body: 
                      [  
                        [
                          {
                            text:' RECIBO\n Cliente',
                            background:'white',
                            fontSize: 10, 
                            bold: true,
                            alignment: 'center',
                          }
                        ],
                        [
                          {
                            text:'RECIBO: #' + this.crecibo, 
                            fontSize: 10, 
                            bold: true
                          }
                        ],
                        [
                          {
                            text:'CONTRATO: ' + this.paquete,
                            fontSize: 10, 
                            bold: true
                          }
                        ],
                      ],
                      alignment: "center"
                    },
                  },
                ],
                [
                  {
                    rowSpan: 3,
                    border: [true, false, false, false],
                    text: 'RECIBIMOS PAGO DE:\nLA CANTIDAD DE:\nPOR CONCEPTO DE PAGO:\nFORMA DE PAGO: \n',
                    margin:[3,65,0,0],
                    fontSize: 10,
                    lineHeight :2,
                  },
                  {
                    border: [false, true, false, false],
                    text: '',
                  },
                  {
                    border: [false, true, false, false],
                    text: '',
                  },
                  {
                    border: [false, true, true, false],
                    text: ''
                  }
                ],
                [
                  '',
                  {
                    colSpan: 3,
                    border: [false, false, true, false],
                    margin:[-30,59,0,0],                          
                    text: this.xcliente +'\n'+ this.mtotal +'\n'+this.xconceptopago +'\n'+ this.formadepago ,
                    fontSize: 10,
                    lineHeight :2
                  },
                  '',
                ],
                [
                  '',
                  {
                      text:'Fecha\n' + this.fcobro,
                      border: [true, true, true, true],
                      margin:[20,0,30,0],
                      fontSize: 10,
                      alignment: "center",
                  },
                  {
                      text:'Saldo Pendiente\n' + this.msaldorestante + ' Pesos',
                      alignment: '',
                      border: [true, true, true, true],
                      fontSize: 10,
                      margin:[10,0,20,0],
                  },
                  {
                      text:'',
                      border: [false, false, true, false],
                      margin:[50,0,0,0]
                  }
                ],
                [
                  {
                    border: [true, false, false, true],
                    table: 
                    {
                      body: 
                      [  
                        [
                          {
                          text:'',
                          background:'white',
                          fontSize: 10, 
                          bold: true,
                          border: [false, false, false, true],
                          }
                        ],
                        [
                          {
                          text:'FIRMA DEL CLIENTE',
                          alignment: 'center',
                          border: [false, false, false, false],
                          fontSize: 10,
                          margin:[0,0,0,20],
                          }
                        ],
                      ],
                    },
                
                  },
                  {
                      text:'',
                      alignment: 'center',
                      border: [false, true, false, true],
                      margin:[-200,0,0,20],
                  },
                  {
                      text:'',
                      border: [false, false, false, true],
                  },
                  {
                  border: [false, false, true, true],
                    table: 
                    {
                      body: 
                      [  
                        [
                          {
                          text:'',
                          background:'white',
                          fontSize: 10, 
                          bold: true,
                          border: [false, false, false, false],
                          }
                        ],
                        [
                          {
                          text:'FIRMA DEL VENDEDOR\n' + this.vendedor,
                          border: [false, true, false, false],
                          alignment: 'center',
                          fontSize: 10
                          }
                        ],
                      ],
                    },
  
  
                  }
                ],
              ]
            },
            layout: 
            {
              defaultBorder: false,
            }
          },
        ]
      }
  
      const mamefile = `${this.xcliente + ' Recibo #' + this.crecibo}.pdf`
      // const PdfKit = pdfMake.createPdf(pdfDefinition);
      // PdfKit.open();
      // PdfKit.download(mamefile);
    }


}