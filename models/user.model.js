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
    sql.query(`SELECT T_TRA.EcoSellos, T_TRA.ViajeOrigen, T_TRA.ViajeOrigen, T_TRA.ViajeDestino, T_TRA.ViajeInicio, T_TRA.ViajeLlegada, T_TRA.ViajeETA, T_TRA.ViajeReferencia, T_TRA.IdLineaTransporte, T_LT.NombreLineaTransporte, T_TRA.IdObservacion, T_OBS.NombreObservacion, T_TRA.ViajeNotas, T_TRA.POCliente, T_TRA.fechaDescargado, T_TRA.horaDescargado, T_TRA.fechaEntregaCliente, T_TRA.horaEntregaCliente   FROM tbltramites T_TRA LEFT JOIN tbllineastransporte T_LT ON T_TRA.IdLineaTransporte = T_LT.IdLineaTransporte LEFT JOIN tbltramites_status_observa T_OBS ON T_TRA.IdObservacion = T_OBS.IdObservacion WHERE T_TRA.IdInspeccion =1 AND  T_TRA.IdTipoManiobra = 1 AND T_TRA.IdClienteFactura = '${userID}'`, (err, res) => {
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
    sql.query(`SELECT T_TRA.EcoSellos, T_TRA.ViajeOrigen, T_TRA.ViajeOrigen, T_TRA.ViajeDestino, T_TRA.ViajeInicio, T_TRA.ViajeLlegada, T_TRA.ViajeETA, T_TRA.ViajeReferencia, T_TRA.IdLineaTransporte, T_LT.NombreLineaTransporte, T_TRA.IdObservacion, T_OBS.NombreObservacion, T_TRA.ViajeNotas, T_TRA.POCliente, T_TRA.fechaEntregaCliente, T_TRA.horaEntregaCliente, T_TRA.fechaDescargado, T_TRA.horaDescargado   FROM tbltramites T_TRA 
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




module.exports = User;