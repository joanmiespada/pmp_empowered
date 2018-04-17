import model from './model'

class user extends model
{
    constructor() {
        super();
        this.name=undefined;
        this.surname=undefined;
        this.email=undefined;
    }

    get Name(){ return this.name}
    set Name(value) { this.name=value}

    get Surname(){ return this.surname}
    set Surname(value) { this.surname=value}

    get Email(){ return this.email}
    set Email(value) { this.email=value}

    
}

export default user; 