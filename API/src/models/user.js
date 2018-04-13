import model from './model'

class user extends model
{
    constructor() {
        super();
        this.name=undefined;
        this.surname=undefined;
        this.email=undefined;
    }

    get name(){ return this.name}
    set name(value) { this.name=value}

    get surname(){ return this.surname}
    set surname(value) { this.surname=value}

    get email(){ return this.email}
    set email(value) { this.email=value}

    
}

export default user; 