import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { autos, fechaFormateada } from "./autos";
import { IconoPDF, IconoPDF1 } from "./Iconos";
import placaImg from './assets/placa.jpg';
import carroImg from './assets/carro.jpg';
import sumaImg from './assets/suma.jpg';


const Reportes = () => {

    const [automoviles, setAutomoviles] = useState(autos);

    const generarReporte = () => {
        // l para horizontal y p para vertical
        const pdf = new jsPDF("l","pt","letter");
        //pdf.save("Reporte PDF.pdf");
        let num = 1;
        const dataAutos = autos.map(auto => {
            const {Inciso,Marca,Modelo,Placa,SumaA} = auto;
            const arrayAutos = {
                num,
                Inciso,
                Marca,
                Modelo,
                Placa,
                SumaA,
            }
            num++;
            console.log(arrayAutos);
            const dataArrayAutos = Object.values(arrayAutos);
            return dataArrayAutos;
        });

        pdf.autoTable({
            didDrawPage:(data) => {
                pdf.setFontSize(11)
                pdf.text("Reporte de autos",40,30)
                pdf.text(fechaFormateada(),650,30)
                pdf.line(40,35,750,35,"F")
                pdf.text("Reporte Generado por: vcastillo :)",40,585)
                pdf.line(40,570,750,570,"F")
                
            },
            head:[["#","Inciso","Marca","Modelo","Placa","SumaA"]],
            //body:dataAutos, //Si solo se desea generar el pdf sin formato de moneda
            body: dataAutos.map(auto => {
                const formattedSumaA = auto[5].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                return [...auto.slice(0, 5), formattedSumaA];
            }),
            //theme:"grid"
        });
        window.open(pdf.output("bloburl"));
    }
    
    const generarFicha = () => {
        const pdf = new jsPDF('l', 'pt', [612, 396]); 
        const margenAncho = 40;
        const margenLargo = 70;
        const valorEspaciado = 30;
        
        autos.map(auto => {
            const { Inciso, Marca, Modelo, Placa, SumaA } = auto;
            // Encabezado con el número de placa
            pdf.setFontSize(24);
            pdf.setTextColor(51, 102, 204); // Color azul
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Ficha Vehiculo ${Placa}`, margenAncho, 50);
            
            // Contenido de la ficha
            pdf.setFontSize(16);
            pdf.setTextColor(0); // Color negro
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Inciso : ${Inciso}`, margenAncho, margenLargo + valorEspaciado);
            pdf.text(`Marca  : ${Marca}`, margenAncho, margenLargo + valorEspaciado * 2);
            pdf.text(`Modelo : ${Modelo}`, margenAncho, margenLargo + valorEspaciado * 3);
            pdf.text(`Placa  : ${Placa}`, margenAncho, margenLargo + valorEspaciado * 4);
            pdf.text(`Suma Asegurada  : ${SumaA.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`, margenAncho, margenLargo + valorEspaciado * 5);
            pdf.addPage();
        });
    
        window.open(pdf.output('bloburl'));
    };
    

    const generarFichaIndividual = (Inciso) => {
        const pdf = new jsPDF('l', 'pt', [612, 396]);
        const margenAncho = 40;
        const margenLargo = 70;
        const valorEspaciado = 30; 

        autos.map(auto => {
            if (auto.Inciso === Inciso) {
                const { Inciso, Marca, Modelo, Placa, SumaA } = auto;
                // Encabezado con el número de placa
                pdf.setFontSize(24);
                pdf.setTextColor(51, 102, 204); // Color azul
                pdf.setFont('helvetica', 'bold');
                pdf.text(`Ficha Vehiculo ${Placa}`, margenAncho, 50);

                // Contenido de la ficha
                pdf.setFontSize(16);
                pdf.setTextColor(0); // Color negro
                pdf.setFont('helvetica', 'normal');
                pdf.text(`Inciso : ${Inciso}`, margenAncho, margenLargo + valorEspaciado);
                pdf.text(`Marca  : ${Marca}`, margenAncho, margenLargo + valorEspaciado * 2);
                pdf.text(`Modelo : ${Modelo}`, margenAncho, margenLargo + valorEspaciado * 3);
                pdf.text(`Placa  : ${Placa}`, margenAncho, margenLargo + valorEspaciado * 4);
                pdf.text(`Suma Asegurada  : ${SumaA.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`, margenAncho, margenLargo + valorEspaciado * 5);
                //pdf.addPage();
            }
        });
        window.open(pdf.output('bloburl'));
    };

    const generarFichaStyle = (Inciso) => {
        const pdf = new jsPDF('l', 'pt', [612, 300]);
        const margin = 25;

        autos.map(auto => {
            if (auto.Inciso === Inciso) {
                const { Inciso, Marca, Modelo, Placa, SumaA } = auto;
    
                const miHtml = `
                <div style='width:${(pdf.internal.pageSize.width - margin * 2)}px;'>
                    <div class="contenedor">
                        <br />
                        <div class="linea"></div>
                        <div class="textoAnio">${Inciso}</div>
                        <div class="linea"></div>
                    </div>
                    <div>
                        <div class="textoMarca">${Marca} ${Modelo}</div>
                    </div>
                    <br />
                    <div class="divGrid">
                        <div>
                            <div class="iconoContainer">
                                <img src=${placaImg} width="30" height="30" />
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
                                <img src=${carroImg} width="30" height="30" />
                            </div>
                            <div class="contenedor1">
                                <div class="textoDivGrid">${Modelo}</div>
                            </div>
                            <div class="contenedor1">
                                <div class="textoDivGrid2">Modelo</div>
                            </div>
                        </div>
                        <div>
                            <div class="iconoContainer">
                                <img src=${sumaImg} width="30" height="30" />
                            </div>
                            <div class="contenedor1">
                                <div class="textoDivGrid"> ${SumaA.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                            </div>
                            <div class="contenedor1">
                                <div class="textoDivGrid2">Suma Asegurada</div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    
                pdf.html(miHtml, {
                    x: margin,
                    y: margin,
                    callback: () => {
                        window.open(pdf.output('bloburl'));
                    },
                });
                }
        });
    };

    return(
        <>
        <div className="container">
            <h1 className="display-4">Reportes</h1>
            <hr/>
            <button className="btn btn-dark" onClick={generarReporte}>Generar Reporte <IconoPDF/></button>
            <button className="btn btn-dark ms-4" onClick={generarFicha}>Generar Fichas <IconoPDF1/></button>
        </div>
        <br />
        <div className="container">
        <h1 className="display-6">Lista de Vehiculos</h1>
        <hr />
        <table className="table table-secondary table-hover">
            <thead>
                <tr>
                    <th>Inciso</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Suma Asegurada</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    automoviles.map(autosMap => {
                        const {Inciso,Marca,Modelo,Placa,SumaA} = autosMap;
                        return (
                            <tr key={Inciso}>
                                <td> {Inciso} </td>
                                <td> {Marca} </td>
                                <td> {Modelo} </td>
                                <td> {Placa} </td>
                                <td> {SumaA.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                <td> 
                                <button className="btn btn-primary" onClick={() => generarFichaIndividual(Inciso)} > <IconoPDF /> </button> 
                                <button className="btn btn-secondary ms-4" onClick={() => generarFichaStyle(Inciso)} > <IconoPDF1/> </button> 
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </>
    )
}

export default Reportes;