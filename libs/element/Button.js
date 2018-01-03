class Button extends Element{
    constructor(path){
        super(Element);
        this.path = path;
    }

    on(ev, callback){
        switch(ev){
            case 'click':
                this.click(callback);
                break;
        }
    }

    click(callback){
        document.body.addEventListener('click',(e)=>{
            if(e.target.closest(this.path)){
                this.$el = e.target.closest(this.path);
                callback(this.$el, e);
                e.preventDefault();
            }
        });
    }
}
