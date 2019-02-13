

export default new class LoadingIndicatorHelper {
    loadIndicator;
    showHandler;
    showProgress(component)
    {
        component.$Progress.start();
    }

    hideProgress(component)
    {
        component.$Progress.hide();
    }

    show(component) {
        this.clearShow();
        component.$Progress.start();

        
        this.showHandler= setTimeout(() => {
            if (this.loadIndicator !== undefined) {
                this.loadIndicator.hide();
            }
            this.loadIndicator = component.$loading.show({
                container: document.querySelector("#routerViewContainer"),
                loader: "bars",
                width: 96,
                height: 96
            });
        }, 100)
    }
    hide(component) {
        component.$Progress.hide();
        this.clearShow();
        if (this.loadIndicator !== undefined) {
            this.loadIndicator.hide();
        }
    }
    clearShow(){
        if(this.showHandler>0){
            clearTimeout(this.showHandler);
        }
    }

}
