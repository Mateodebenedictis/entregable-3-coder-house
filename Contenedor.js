const fs=require('fs');


class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    createFile(){
        fs.writeFileSync(this.nombreArchivo, '');
    }

    save(objeto) {
        let array = this.getAll();
        this.id = array.length + 1;
        objeto.id = this.id;
        array.push(objeto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return this.id;
    }

    getById(id) {
        let array = this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        return objeto;
    }

    updateById(id, objeto) {
        try {
            let array = this.getAll();
            let objetoActualizado = array.find(objeto => objeto.id === id);
            let indice = array.indexOf(objetoActualizado);
            objeto.id = id;
            array[indice] = objeto;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        }
        catch (error) {
            console.log(error);
            console.log('No se pudo actualizar el objeto con ese ID');
        }
    }

    getAll() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }

    deleteById(id) {
        let array = this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        let indice = array.indexOf(objeto);
        array.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
    }

    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '');
    }
}

module.exports = Contenedor;
