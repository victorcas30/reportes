import jsPDF from "jspdf";
import "jspdf-autotable";
import { autos, fechaFormateada } from "./autos";
import "./style.css"
import html2pdf from 'html2pdf.js';
import 'svg2pdf.js'


const ReportesHtml = () => {
    const carros =
    {
     "Inciso": 1,
     "NoEquipo": "SV-PU0943",
     "Marca": "NISSAN",
     "Modelo": "PICK UP",
     "Placa": "P-77380",
     "Anio": 2006,
     "Clase": "B",
     "Deducible": 0,
     "SumaA": 7500,
     "Prima": 34.5
    };

    const {Inciso,NoEquipo,Marca,Modelo,Placa,Anio,Clase,Deducible,SumaA,Prima} = carros;

    const generarFichaHTML = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const margin = 10;
    const scale = (pdf.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
    const miHtml = `<table style='width:${(pdf.internal.pageSize.width - margin * 2)}px;border:solid;border-style:thin;'>
    <tr>
      <td>${NoEquipo}</td>
    </tr>
  </table>`;

    pdf.html(miHtml, {
      x: 10,
      y: 10,
      callback: () => {
        //pdf.save("FichaHtml.pdf");
        window.open(pdf.output('bloburl', { filename: 'FichaHtml.pdf' }));
      },
    });

  };
    const generarFichaAutosHTML = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');
    const margin = 10;
    const scale = (pdf.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
    const svgData = `<svg height="40" width="40"><circle cx="20" cy="20" r="15" style="fill: blue; stroke: black; stroke-width: 1;" /></svg>`;
    const miHtml = `
    <div style='width:${(pdf.internal.pageSize.width - margin * 2)}px;border:solid;border-style:thin;'>
    <div class="contenedor">
    <div class="linea"></div>
    <div class="textoAnio">${Anio}</div>
    <div class="linea"></div>
    </div>
    <div>
        <div class="textoMarca">${Marca} ${Modelo}</div>
    </div>
    <br>
    <div class="divGrid">
                <div>
                    <div class="iconoContainer">
                    
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid">${Placa}</div>
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid2">Placa</div>
                    </div>
                </div>
                <div>
                    <div class="iconoContainer">
                 
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid">${Clase}</div>
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid2">Clase</div>
                    </div>
                </div>
                <div>
                    <div class="iconoContainer">
                  
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid">$ ${SumaA}</div>
                    </div>
                    <div class="contenedor1">
                    <div class="textoDivGrid2">Suma Asegura</div>
                    </div>
                </div>
            </div>
            </div>
    `;



   pdf.html(miHtml, {
      x: 10,
      y: 10,
      callback: () => {
        //pdf.save("FichaHtml.pdf");
        window.open(pdf.output('bloburl', { filename: 'FichaHtml.pdf' }));
      },
    });

  };

  const generarFichaAutosHTML2pdf = () => {
    const options = {
      filename: 'FichaHtml.pdf',
      image: { type: 'jpeg', quality: 0.98 }, // Opcional, configura la calidad de las imágenes en el PDF
      html2canvas: { scale: 4 }, // Opcional, aumenta la escala para obtener una mejor calidad de imagen
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' } // Opcional, configura el tamaño y orientación del PDF
    };
  
    const element = document.getElementById('ficha-autos'); // Agrega un id al contenedor del HTML
  
    html2pdf().set(options).from(element).save();
  };

  const generarFichaAutosHTML2Texto = () => {
    const element = document.createElement('div');
    element.innerHTML = `
    <style>
    .contenedor {
        display: flex;
        align-items: center;
      }
      
      .linea {
        flex-grow: 1;
        height: 1px;
        background-color: lightgray;
      }
      
      .textoAnio {
        margin: 0 10px;
        color: #0684b9;
      }
      
      .textoMarca {
          margin: 0 10px;
          color: black;
          text-align: center;
          font-weight: bold;
          font-size: x-large;
        }
        
        .divGrid {
            display: grid;
            grid-template-columns: 33% 33% 33%;
        }
        
        
        .textoDivGrid {
          margin: 0 10px;
          color: #0684b9;
          font-weight: bolder;
          font-size: larger;
        }
        .textoDivGrid2 {
          margin: 0 10px;
          color: #0684b9;
          font-size: medium;
        }
    
        .iconoContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1px;
          }
    
        .icono {
            /*margin-right: 10px;*/
            width: 45px; /* Ajusta el ancho y el alto según tus necesidades */
            height: 45px;
          }
          
          .contenedor1 {
            flex-grow: 1;
            text-align: center;
          }
    </style>
    <div >
    <div className="contenedor">
    <div className="linea"></div>
    <div className="textoAnio">${Anio}</div>
    <div className="linea"></div>
    </div>
    <div>
        <div className="textoMarca">${Marca} ${Modelo}</div>
    </div>
    <br />
    <div className="divGrid">
                <div>
                    <div className="iconoContainer">
                    <img src=${iconPlaca} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">${Placa}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Placa</div>
                    </div>
                </div>
                <div>
                    <div className="iconoContainer">
                    <img src=${iconClase} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">${Clase}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Clase</div>
                    </div>
                </div>
                <div>
                    <div className="iconoContainer">
                    <img src=${iconSuma} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">$ ${SumaA}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Suma Asegura</div>
                    </div>
                </div>
            </div>
            </div>
    `;

    const opt = {
        margin: 10,
        filename: 'FichaHtml.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
        jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
        css: `
        .contenedor {
            display: flex;
            align-items: center;
          }
          
          .linea {
            flex-grow: 1;
            height: 1px;
            background-color: lightgray;
          }
          
          .textoAnio {
            margin: 0 10px;
            color: #0684b9;
          }
          
          .textoMarca {
              margin: 0 10px;
              color: black;
              text-align: center;
              font-weight: bold;
              font-size: x-large;
            }
            
            .divGrid {
                display: grid;
                grid-template-columns: 33% 33% 33%;
            }
            
            
            .textoDivGrid {
              margin: 0 10px;
              color: #0684b9;
              font-weight: bolder;
              font-size: larger;
            }
            .textoDivGrid2 {
              margin: 0 10px;
              color: #0684b9;
              font-size: medium;
            }
        
            .iconoContainer {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 1px;
              }
        
            .icono {
                /*margin-right: 10px;*/
                width: 45px; /* Ajusta el ancho y el alto según tus necesidades */
                height: 45px;
              }
              
              .contenedor1 {
                flex-grow: 1;
                text-align: center;
              }
        `
      };
  
    html2pdf()
      .set(opt)
      .from(element)
      .save('FichaHtml.pdf');
  };

  const generarHTMLOtroIntento = () =>{
    const pdf = new jsPDF('l','pt','letter');

    window.open(pdf.output('bloburl'));
  }

  return (
    <>
      <div className="container">
        <h1 className="display-4">Reportes</h1>
        <hr />
        <button className="btn btn-dark ms-4" onClick={generarFichaHTML}>
          Ficha HTML
        </button>
        <button className="btn btn-dark ms-4" onClick={generarFichaAutosHTML}>
          Ficha HTML Carro
        </button>
        <button className="btn btn-dark ms-4" onClick={generarFichaAutosHTML2pdf}>
          Ficha HTML2pdf
        </button>
        <button className="btn btn-dark ms-4" onClick={generarFichaAutosHTML2Texto}>
          Ficha HTML2pdf Texto
        </button>
        <button className="btn btn-dark ms-4" onClick={generarHTMLOtroIntento}>Generar html otro intento</button>
      <br />
      <br />
      <div id="ficha-autos">
            <div className="contenedor">
                <div className="linea"></div>
                <div className="textoAnio">{Anio}</div>
                <div className="linea"></div>
            </div>
            <div>
                <div className="textoMarca">{Marca} {Modelo}</div>
            </div>
            <br />
            <div className="divGrid">
                <div>
                    <div className="iconoContainer">
                    <img src={iconPlaca} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">{Placa}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Placa</div>
                    </div>
                </div>
                <div>
                    <div className="iconoContainer">
                    <img src={iconClase} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">{Clase}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Clase</div>
                    </div>
                </div>
                <div>
                    <div className="iconoContainer">
                    <img src={iconSuma} alt="Icono" className="icono" />
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid">${SumaA}</div>
                    </div>
                    <div className="contenedor1">
                    <div className="textoDivGrid2">Suma Asegura</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ReportesHtml;
