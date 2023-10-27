import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-hedging-notes',
  templateUrl: './hedging-notes.component.html',
  styleUrls: ['./hedging-notes.component.scss']
})
export class HedgingNotesComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cnota', 'xcedente', 'xasegurado', 'fdesde', 'fhasta', 'xmarca', 'star'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable: boolean = true;

  xtipo: string;
  xasegurado: string;
  xdireccion: string;
  xdireccion_ced: string;
  xcedente: string;
  fdesde: any;
  fhasta: any;
  xinteres: string;
  xmarca: string;
  xmatricula: string;
  xserial: string;
  nano: number;
  nasientos: number;
  nasientos_tripulantes: number;
  xlogo: any;
  cnota: number;
  xdatos_tecnicos: string;
  xlimites: string;
  xcondiciones: string;
  xprimas_tasas: string;
  xterminos: string;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/hedging-notes/search', data).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.data = response.data.list;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreatePDF(cnota: any) {
    let data = {
      cnota: cnota
    }
    this.http.post(environment.apiUrl + '/api/v1/hedging-notes/detail', data).subscribe((response: any) => {
      if (response.status) {
        this.cnota = cnota;
        this.xtipo = response.data.xtipo;
        this.xasegurado = response.data.xasegurado;
        this.xdireccion = response.data.xdireccion;
        this.xcedente = response.data.xcedente;
        this.xdireccion_ced = response.data.xdireccion_ced;
        this.fdesde = response.data.fdesde;
        this.fhasta = response.data.fhasta;
        this.xinteres = response.data.xinteres;
        this.xmarca = response.data.xmarca;
        this.xmatricula = response.data.xmatricula;
        this.xserial = response.data.xserial;
        this.nano = response.data.nano;
        this.nasientos = response.data.nasientos;
        this.nasientos_tripulantes = response.data.nasientos_tripulantes;
        this.xdatos_tecnicos = response.data.xdatos_tecnicos;
        this.xlimites = response.data.xlimites;
        this.xcondiciones = response.data.xcondiciones;
        this.xprimas_tasas = response.data.xprimas_tasas;
        this.xterminos = response.data.xterminos;
        this.getPDF();
      }
    });
  }

  getMonthAsString(month: number): string {
    month = month + 1;
    if (month === 1) {
      return 'Enero';
    }
    if (month === 2) {
      return 'Febrero';
    }
    if (month === 3) {
      return 'Marzo';
    }
    if (month === 4) {
      return 'Abril';
    }
    if (month === 5) {
      return 'Mayo';
    }
    if (month === 6) {
      return 'Junio';
    }
    if (month === 7) {
      return 'Julio';
    }
    if (month === 8) {
      return 'Agosto';
    }
    if (month === 9) {
      return 'Septiembre';
    }
    if (month === 10) {
      return 'Octubre';
    }
    if (month === 11) {
      return 'Noviembre';
    }
    if (month === 12) {
      return 'Diciembre';
    }
    return '';
  }

  getPDF() {
    try {
      const imgURL = 'https://i.ibb.co/7kdTWzN/1519952492953.jpg'; 

      fetch(imgURL)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = () => {
            const dataURL = reader.result;
            this.xlogo = dataURL;

            const pdfDefinition = {
              info: {
                title: `Nota de Cobertura No. ${this.cnota} - ${this.xasegurado}`,
                subject: `Nota de Cobertura No. ${this.cnota} - ${this.xasegurado}`
              },
              content: [
                {
                  columns: [
                    {
                      style: 'data',
                      table: {
                        widths: [300],
                        body: [
                          [ {image: this.xlogo, width: 135, height: 90, border:[false, false, false, false]}]
                        ]
                      }
                    },
                    {
                      table: {
                        alignment: 'right',
                        widths: [200, -49, 5],
                        body: [
                          [{text: [{text: `\n\n\nCaracas, ${new Date().getDate()} de ${this.getMonthAsString(new Date().getMonth())} de ${new Date().getFullYear()}`}], bold: true, fontSize: 10, border: [false, false, false, false]} ]
                        ]
                      },
                    },
                  ]
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'title',
                  text: [
                    {text: 'Nota de Cobertura No. ', bold: true}, {text: `${this.cnota}`, bold: true}
                  ]
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nTipo: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xtipo}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nAsegurado: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xasegurado}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nDirección: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xdireccion}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nReasegurado: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xcedente} o sus Reaseguradores Obligatorios según sea Requerido. \n\n${this.xdireccion_ced}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nPeríodo: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\nVigencia Desde: ${this.fdesde}    Vigencia Hasta: ${this.fhasta}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nInterés: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xinteres}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'tableExample',
                  alignment: 'center' as 'center',
                  widths: ['*'],
                  table: {
                    body: [
                      ['Marca/Modelo', 'Matrícula', 'Serial', 'Año', 'Asientos Pasajeros', 'Asientos Tripulantes'],
                      [`${this.xmarca}`, `${this.xmatricula}`, `${this.xserial}`, `${this.nano}`, `${this.nasientos}`, `${this.nasientos_tripulantes}`],
                    ]
                  },
                  layout: {
                    fillColor: function (rowIndex: number, node: any, columnIndex: number): string | null {
                      return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                    }
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nSUMA ASEGURADA ORIGINAL: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xdatos_tecnicos}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nLIMITES GEOGRAFICOS: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xlimites}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nCONDICIONES: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xcondiciones}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nPRIMAS Y TASAS: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xprimas_tasas}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nPRIMAS Y TASAS: ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xprimas_tasas}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nTERMINOS DE PAGO ', alignment: 'left', bold: true, border:[false, false, false, false]}, {text: `\n${this.xterminos}`, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  columns: [
                    {
                      text: [
                        {text: ' '}
                      ]
                    }
                  ]
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\n\n\nPor Globex Re. ', alignment: 'left', border:[false, false, false, false]}, {text: ` `, border:[false, false, false, false]}]
                    ]
                  }
                },
                {
                  style: 'data', 
                  table: {
                    widths: [30, 110, '*'],
                    body: [
                      [{text: ' ', border:[false, false, false, false]}, {text: '\nPedro Emilio Coll', alignment: 'left', border:[false, false, false, false]}, {text: ` `, border:[false, false, false, false]}]
                    ]
                  }
                },
              ], 
              styles: {
                title: {
                  fontSize: 14,
                  bold: true,
                  alignment: 'center' as 'center',
                },
                header: {
                  fontSize: 7.5,
                  color: 'gray',
                },
                data: {
                  fontSize: 11,
                },
              },
            };

            let pdf = pdfMake.createPdf(pdfDefinition);
            pdf.open();
          };
          reader.readAsDataURL(blob);
        });
    } catch (err) {
      console.error(err);
    }
  }

  
  
}
