Ext.ns('ScriptBuilder.Components');

/**
 * The raw configuration for building the scriptbuilder tree
 */
ScriptBuilder.Components.getComponents = function(selectedToolbox) {
    var comps = {
        text : "Script Builder Components",
        expanded : true,
        children : []
    };

    
    console.log("Testing..");

    // http://jupiter-bt.nexus.csiro.au:5000/templates
    // http://localhost:8000/templates
    Ext.data.JsonP.request({
        url : 'http://localhost:8000/templates',
        callbackKey: 'callback',
        //scope : this,

        
        
        callback : function(options, success, response) {
            var errorMsg, errorInfo;
            console.log("options");
            console.log(options);
            console.log(success);
            console.log(response);
            

            if (success) {
                //var responseObj = Ext.JSON.decode(response.responseText);
                //if (responseObj.success) {
                    console.log("success")
                	
                	success.forEach( function (template) {
                	    console.log(template.name);
                	    if (template.dependencies instanceof Array){
                	    	
                	    	template.dependencies.forEach( function (toolbox) {
                	    		console.log(toolbox.name);
                	    	});
                	    }
                	});
                	
                	
                	
                	
                	
                	
                	
                	//this.scriptBuilderFrm.replaceScript(responseObj.data);                    
                    return;
                //} else {
                //    errorMsg = responseObj.msg;
                //    errorInfo = responseObj.debugInfo;
                //}
            } else {
                console.log("no success")

                errorMsg = "There was an error loading your script.";
                errorInfo = "Please try again in a few minutes or report this error to cg_admin@csiro.au.";
            }

            //Create an error object and pass it to custom error window
            var errorObj = {
                title : 'Script Loading Error',
                message : errorMsg,
                info : errorInfo
            };

            var errorWin = Ext.create('portal.widgets.window.ErrorWindow', {
                errorObj : errorObj
            });
            errorWin.show();
        }
    });

 
        
//    
//    
//    switch (selectedToolbox.toLowerCase()) {
//        case "escript":
//            comps.children.push(ScriptBuilder.Components.getEscriptExamples());
//            break;
//        case "anuga":
//            comps.children.push(ScriptBuilder.Components.getANUGAExamples());
//            break;
//        case "tcrm":
//            comps.children.push(ScriptBuilder.Components.getTCRMExamples());
//            break;
//        default:
//            comps.children.push(ScriptBuilder.Components.getEscriptExamples());
//            comps.children.push(ScriptBuilder.Components.getANUGAExamples());
//            comps.children.push(ScriptBuilder.Components.getTCRMExamples());
//    }

    return comps;
};


ScriptBuilder.Components.getEscriptExamples = function() {
    return {
        text : "escript Examples",
        type : "category",
        expanded : true,
        children : [{
            id   : "ScriptBuilder.templates.EScriptGravityTemplate",
            type : "s",
            text : "Gravity Inversion",
            qtip : "Perform a gravity inversion using escript. Expects data in the form of a NetCDF file. Double click to use this example.",
            leaf : true
        },{
            id   : "ScriptBuilder.templates.EScriptMagneticTemplate",
            type : "s",
            text : "Magnetic Inversion",
            qtip : "Perform a magnetic inversion using escript. Expects data in the form of a NetCDF file. Double click to use this example.",
            leaf : true
        },{
            id   : "ScriptBuilder.templates.EScriptJointTemplate",
            type : "s",
            text : "Joint Inversion",
            qtip : "Perform a joint gravity/magnetic inversion using escript. Expects both datasets to be in the form of seperate NetCDF files. Double click to use this example.",
            leaf : true
        },{
            id   : "ScriptBuilder.templates.EScriptGravityPointTemplate",
            type : "s",
            text : "Gravity Point Inversion",
            qtip : "Perform a gravity inversion using escript. Expects data in the form of a simple wfs file. Double click to use this example.",
            leaf : true
        }]
    };
};



ScriptBuilder.Components.getANUGAExamples = function() {
    return {
        text : "ANUGA Examples",
        type : "category",
        expanded : true,
        children : [{
            id   : "ScriptBuilder.templates.ANUGATemplate",
            type : "s",
            text : "ANUGA Hydrodynamic/Hydraulic Modelling",
            qtip : "Modelling the impact of hydrological disasters such as dam breaks, riverine flooding, storm-surge or tsunamis.  Expects data in the form of NetCDF file.  Double click to use this example.",
            leaf : true
        }]
    };
};

ScriptBuilder.Components.getTCRMExamples = function() {
    return {
        text : "TCRM Examples",
        type : "category",
        expanded : true,
        children : [{
            id   : "ScriptBuilder.templates.TCRMPortHedlandTemplate",
            type : "s",
            text : "Tropical Cyclone Risk Model",
            qtip : "Estimating the wind hazard from tropical cyclones.  Double click to use this example.",
            leaf : true
        }]
    };
};
