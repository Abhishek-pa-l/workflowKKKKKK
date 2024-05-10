sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.View1", {
            onInit: function () {

            },
            onWF: function () {
                debugger;
                let oModel = this.getOwnerComponent().getModel();
              
                const oSupplier = this.getView().byId("supplier").getValue();
                const oOrderno = this.getView().byId("order").getValue();
                const oAmount = this.getView().byId("amount").getValue();
                
              
                let data = {
                    "supplier": oSupplier,
                    "orderNo": oOrderno,
                    "amount": oAmount
                };
              
                let payload = {
                    payload: JSON.stringify(data)
                };
              
                oModel.create("/Submit", payload, {
                    success: function (res) {
                        sap.m.MessageBox.success("Submit successfully");
                        console.log("done", res);
                    },
                    error: function (err) {
                        sap.m.MessageBox.error("ERROR");
                        console.error("Error in Submit:", err);
              
                        // Log more details about the error
                        if (err.response) {
                            console.error("Response data:", err.response.data);
                            console.error("Response status:", err.response.status);
                            console.error("Response headers:", err.response.headers);
                        } else if (err.request) {
                            console.error("No response received:", err.request);
                        } else {
                            console.error("Error setting up the request:", err.message);
                        }
                    }
                });
              }
        });
    });
