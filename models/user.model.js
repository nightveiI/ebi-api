const sql = require("./db.js");
//SELECT `id`, `UName`, `password` FROM `tblusuarios_reg` AS `User` WHERE `User`.`UName` = 'MFOOD'

const User = function (user) {
    this.username = user.username;
    this.password = user.password;
};


User.findbyUser = (username, password, result) => {
    sql.query(`SELECT * FROM tblusuarios_reg where UName= '${username}' AND password= '${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
}




User.getTables = (userID, result) => {
    sql.query(`SELECT T_TRA.EcoSellos, T_TRA.ViajeOrigen, T_TRA.ViajeOrigen, T_TRA.ViajeDestino, T_TRA.ViajeInicio, T_TRA.ViajeLlegada, T_TRA.ViajeETA, T_TRA.ViajeReferencia, T_TRA.IdLineaTransporte, T_LT.NombreLineaTransporte, T_TRA.IdObservacion, T_OBS.NombreObservacion, T_TRA.ViajeNotas, T_TRA.POCliente, T_TRA.fechaDescargado, T_TRA.horaDescargado, T_TRA.fechaEntregaCliente, T_TRA.horaEntregaCliente, T_TRA.aplicaordenservicio   FROM tbltramites T_TRA LEFT JOIN tbllineastransporte T_LT ON T_TRA.IdLineaTransporte = T_LT.IdLineaTransporte LEFT JOIN tbltramites_status_observa T_OBS ON T_TRA.IdObservacion = T_OBS.IdObservacion WHERE T_TRA.IdInspeccion =1 AND  T_TRA.IdTipoManiobra = 1 AND T_TRA.IdClienteFactura = '${userID}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user Table : ", res);
        result(null, res);
    });
}

User.getdoneTables = (userID, result) => {
    sql.query(`SELECT T_TRA.EcoSellos, T_TRA.ViajeOrigen, T_TRA.ViajeOrigen, T_TRA.ViajeDestino, T_TRA.ViajeInicio, T_TRA.ViajeLlegada, T_TRA.ViajeETA, T_TRA.ViajeReferencia, T_TRA.IdLineaTransporte, T_LT.NombreLineaTransporte, T_TRA.IdObservacion, T_OBS.NombreObservacion, T_TRA.ViajeNotas, T_TRA.POCliente, T_TRA.fechaEntregaCliente, T_TRA.horaEntregaCliente, T_TRA.fechaDescargado, T_TRA.horaDescargado, T_TRA.aplicaordenservicio   FROM tbltramites T_TRA 
    LEFT JOIN tbllineastransporte T_LT ON T_TRA.IdLineaTransporte = T_LT.IdLineaTransporte 
    LEFT JOIN tbltramites_status_observa T_OBS ON T_TRA.IdObservacion = T_OBS.IdObservacion WHERE T_TRA.IdInspeccion =1 AND  T_TRA.fechaEntregaCliente>='$nuevafecha' AND T_TRA.IdClienteFactura ='${userID}' AND T_TRA.IdTipoManiobra = 2`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user Table : ", res);
        result(null, res);
    });
}



User.getInventory = (userID, result) => {
    sql.query(`SELECT T_PRO.IdFolioTramite, T_TRA.FechaLlegada, T_TRA.IdClienteFactura, T_PRO.NumeroBultos, T_PRO.LibrasProducto, T_PRO.IdProducto, T_PRO.DescripcionProductoIngles, T_PRO.TotalSalidas, T_TRA.POCliente, (T_PRO.NumeroBultos-T_PRO.TotalSalidas) Existencia FROM tbltramitesproductos T_PRO 
    LEFT JOIN tbltramites T_TRA ON T_PRO.IdInspeccion = T_TRA.IdInspeccion AND T_PRO.IdFolioTramite = T_TRA.IdFolioTramite
    WHERE T_PRO.IdInspeccion =10 AND T_TRA.IdClienteFactura ='${userID}' AND (T_PRO.NumeroBultos-T_PRO.TotalSalidas)>0 AND T_PRO.IdTipoProducto =1
    AND NOT T_TRA.Certificado04 IS NULL`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user Table : ", res);
        result(null, res);
    });
}

User.getTraffic = (result) => {
    sql.query(`SELECT tbltramites.IdFolioTramite FOLIO, tbltramites.EcoSellos ECO, tbllineastransporte.NombreLineaTRansporte TRANSPORTE, tbltramites.HoraListo HORA FROM tbltramites 
    INNER JOIN tbllineastransporte ON tbltramites.IdLineaTransporte = tbllineastransporte.IdLineaTransporte 
    INNER JOIN tbltramitestiempos ON tbltramites.IdInspeccion = tbltramitestiempos.IdINspeccion AND tbltramitestiempos.IdConceptoTiempo =10 
    AND tbltramites.IdFolioTRamite = tbltramitestiempos.IdFolioTramite WHERE tbltramites.IdInspeccion = 1 And tbltramites.Listo = 1 And tbltramitestiempos.HoraRegistro Is Null
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Traffics Table : ", res);
        result(null, res);
    });
}

User.getOperations = (userID, result) => {
    sql.query(`SELECT TR.IdFOlioTramite, TR.IdConceptoProceso, TR.FechaTramite, TR.IdAduana, AD.NombreAduana, TR.IdClienteFactura, CL.NombreCLiente, TR.IdLineaTRansporte, 
    LT.NombreLineaTRansporte, TR.IdTramite, TR.FechaLLegada, TR.POCliente, TR.EcoSellos, TR.FechaConceptoProceso, TR.Listo, TR.HoraListo, VO.Secuencia, VO.FechaENtrada, 
    VO.HoraENtrada, VO.IdLocalizacion, VO.TelRadio 
    FROM tbltramites TR  LEFT JOIN tbladuanas AD ON TR.IdAduana = AD.IdAduana  
    LEFT JOIN tblclientes CL ON TR.IdCLienteFactura = CL.IdCliente LEFT JOIN tbllineastransporte LT ON TR.IdLIneaTRansporte = LT.IdLineaTRansporte 
    LEFT JOIN tblvehiculos_operaciones VO ON TR.EcoSellos = VO.NumEconomico AND TR.IdLineaTRansporte = VO.IdLineaTransporte AND TR.FechaTramite = VO.FechaEntrada  
    WHERE TR.FolioCancelado =0 AND TR.IdInspeccion =1 	AND TR.IdClienteFactura ='${userID}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Operations Table : ", res);
        result(null, res);
    });
}

User.get2ndOperations = (userID, result) => {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    var dd = String(yesterday.getDate()).padStart(2, '0');
    var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = yesterday.getFullYear();
    yesterday =  yyyy + '/' + mm + '/' + dd;
    sql.query(`SELECT TR.IdFOlioTramite, TR.IdConceptoProceso, TR.FechaTramite, TR.IdAduana, AD.NombreAduana, TR.IdClienteFactura, CL.NombreCLiente, TR.IdLineaTRansporte, LT.NombreLineaTRansporte, 
    TR.IdTramite, TR.FechaLLegada, TR.POCliente, TR.EcoSellos, TR.FechaConceptoProceso, TR.Listo, TR.HoraListo, VO.Secuencia, VO.FechaENtrada, VO.HoraENtrada, VO.IdLocalizacion, VO.TelRadio 
    FROM tbltramites TR  LEFT JOIN tbladuanas AD ON TR.IdAduana = AD.IdAduana 
    LEFT JOIN tblclientes CL ON TR.IdCLienteFactura = CL.IdCliente LEFT JOIN tbllineastransporte LT ON TR.IdLIneaTRansporte = LT.IdLineaTRansporte 
    LEFT JOIN tblvehiculos_operaciones VO ON TR.EcoSellos = VO.NumEconomico AND TR.IdLineaTRansporte = VO.IdLineaTransporte AND TR.FechaTramite = VO.FechaEntrada 
    WHERE TR.FolioCancelado =0 AND TR.IdInspeccion =1 AND TR.IdConceptoProceso =6 AND TR.FechaTramite> '${yesterday.toDateString()}' AND TR.IdClienteFactura ='${userID}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Operations Table : ", res);
        result(null, res);
    });
}


// User.get3rdOperations = (userID, result) => {
//     const today = new Date();
//     const yesterday = new Date(today);

//     yesterday.setDate(yesterday.getDate() - 1);
//     var dd = String(yesterday.getDate()).padStart(2, '0');
//     var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = yesterday.getFullYear();
//     yesterday =  yyyy + '/' + mm + '/' + dd;
//     sql.query(`SELECT TR.IdFOlioTramite, TR.IdConceptoProceso, TR.FechaTramite, TR.IdAduana, AD.NombreAduana, TR.IdClienteFactura, CL.NombreCLiente, TR.IdLineaTRansporte, LT.NombreLineaTRansporte,
//     TR.IdTramite, TR.FechaLLegada, TR.POCliente, TR.EcoSellos, TR.FechaConceptoProceso, TR.Listo, TR.HoraListo, VO.Secuencia, VO.FechaENtrada, VO.HoraENtrada, VO.IdLocalizacion, VO.TelRadio, 
//     YEAR(FechaLlegada) FROM tbltramites TR  LEFT JOIN tbladuanas AD ON TR.IdAduana = AD.IdAduana 
//     LEFT JOIN tblclientes CL ON TR.IdCLienteFactura = CL.IdCliente LEFT JOIN tbllineastransporte  LT ON TR.IdLIneaTRansporte = LT.IdLineaTRansporte 
//     LEFT JOIN tblvehiculos_operaciones VO ON TR.EcoSellos = VO.NumEconomico AND TR.IdLineaTRansporte = VO.IdLineaTransporte AND TR.FechaTramite = VO.FechaEntrada 
//     WHERE TR.FolioCancelado =0 AND TR.IdInspeccion =1 AND FechaLlegada>=  '2021/05/13' AND FechaLlegada <=
//      '2021/05/13'  AND FechaTramite IS NULL AND TR.IdClienteFactura ='${userID}'`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("Operations Table : ", res);
//         result(null, res);
//     });
// }

// User.get4thOperations = (userID, result) => {
//     const today = new Date();
//     const yesterday = new Date(today);

//     yesterday.setDate(yesterday.getDate() - 1);
//     var dd = String(yesterday.getDate()).padStart(2, '0');
//     var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = yesterday.getFullYear();
//     yesterday =  yyyy + '/' + mm + '/' + dd;
//     sql.query(`SELECT TR.IdFOlioTramite, TR.IdConceptoProceso, TR.FechaTramite, TR.IdAduana, AD.NombreAduana, TR.IdClienteFactura, CL.NombreCLiente, TR.IdLineaTRansporte, 
//     LT.NombreLineaTRansporte,  TR.IdTramite, TR.FechaLLegada, TR.POCliente, TR.EcoSellos, TR.FechaConceptoProceso, TR.Listo, TR.HoraListo, VO.Secuencia, VO.FechaENtrada, 
//     VO.HoraENtrada, VO.IdLocalizacion, VO.TelRadio, TT.IdConceptoTiempo, TT.FechaRegistro, TT.HoraRegistro, TR.InspeccionUSDA FROM tbltramites TR 
//     LEFT JOIN tbladuanas AD ON TR.IdAduana = AD.IdAduana LEFT JOIN tblclientes CL ON TR.IdCLienteFactura = CL.IdCliente 
//     LEFT JOIN tbllineastransporte  LT ON TR.IdLIneaTRansporte = LT.IdLineaTRansporte LEFT JOIN tblvehiculos_operaciones VO ON TR.EcoSellos = VO.NumEconomico 
//     AND TR.IdLineaTRansporte = VO.IdLineaTransporte AND TR.FechaTramite = VO.FechaEntrada 
//     LEFT JOIN tbltramitestiempos TT ON TR.IdInspeccion =1 = TT.IdInspeccion AND TR.IdFolioTramite = TT.IdFolioTramite 
//     WHERE TR.FolioCancelado = 0 AND TR.IdInspeccion =1 AND (TR.IdConceptoProceso = 1 OR TR.IdConceptoProceso = 2 OR TR.IdConceptoProceso = 7) 
//     AND TR.FechaTramite<'2021/05/13' AND TT.IdCOnceptoTiempo =14 AND TT.FechaRegistro IS NULL AND TR.IdClienteFactura ='${userID}'`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("Operations Table : ", res);
//         result(null, res);
//     });
// }






module.exports = User;