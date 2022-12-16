const { generateId, writeToFile } = require("../utils/utils");

interface Finder {
    id?: number,
    email?: string
 }

class ModelService {
    private Model: any[];
    private Path: string;

    constructor(model: any[], path: string) {
        this.Model = model         /* this.Model is our array in this case*/
        this.Path = path
    }

//this returns everything, sends the whole model back!(GET/READ)
async find(){
    return new Promise((resolve, reject)=>{
        resolve(this.Model)
    })
}

//this finds one, either by id or an email (GET/READ)
    async findOne(query: Finder) {
        return new Promise((resolve, reject) => {
            const key = Object.keys(query)[0]
            const value = Object.values(query)[0]
            const response = this.Model.find(data => data[key] === value)
            if (response) { 
                resolve(response)
            } else {
                resolve(false)
            }
        })
    }

    //CREATE in CRUD
    async create(data: Record<string, any>) {
        return new Promise((resolve, reject) => {
            const id = generateId(this.Model)
            const dataToSave = { id, ...data }
            this.Model.push(dataToSave)

            writeToFile(this.Path, this.Model) /*where this.path is the directory folder and this.Model is the data we wnt to write */
            resolve(dataToSave);
        })
    }

    async update(query: {id: number}, target:Record<string, any>){ /* where data is the target*/
        return new Promise((resolve, reject) =>{
        const id = Object.values(query)[0]; /*id here can be user id or product id  */
        const dataIndex = this.Model.findIndex((data)=> data.id === id)
        
        if(dataIndex === -1){ /* dis means that if the data id we're looking for in that array(this.Model) is not there, return false*/
            resolve(false)
        } else {
            this.Model[dataIndex] = {...target} /*this.Model is our array  */

            writeToFile(this.Path, this.Model)
            resolve(this.Model[dataIndex])
        }
        })
    }

    async remove(query: {id: number}) {
        return new Promise((resolve, reject) =>{
            const id = Object.values(query)[0]
            this.Model = this.Model.filter((data)=> data.id !== id)

            writeToFile(this.Path, this.Model)
            resolve(true)
        })
    }

}

export default ModelService;