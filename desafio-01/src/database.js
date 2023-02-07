import fs from 'node:fs/promises'
const databasePath = new URL('../database.json', import.meta.url);

export class Database{

    #database= {}

    constructor(){
        fs.readFile(databasePath, 'utf-8')
            .then(data=>{
                this.#database = JSON.parse(data)
            }).catch(()=>{
                this.#persist()
            })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }


    select(table){
        let data = this.#database[table] ?? []     
        return data
    }

    insert(table,data){
        if(Array.isArray(this.#database[table]))
        {
            this.#database[table].push(data)
        }
        else{
            this.#database[table] = [data]
        }
        this.#persist()

        return data
    }

    delete(table,id){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }
    }

    update(table,id,data){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)

        if(rowIndex > -1){
            const row = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = {id,...row,...data}
            this.#persist()
        }
    }
    
    completed(table,id){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)

        if(rowIndex > -1){
            const isTaskCompleted = !!this.#database[table][rowIndex].completed_at
            this.#database[table][rowIndex].completed_at = isTaskCompleted ? null : new Date()
            this.#persist()
        }
    }
    
    // Atualização de uma task pelo id
    // Marcar pelo id uma task como completa
}