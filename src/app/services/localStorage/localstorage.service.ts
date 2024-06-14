import { Injectable } from "@angular/core";
import { ConfigurationEnv, ModelsOpenAI } from "../../interfaces/training.interface";

@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {

    setConfiguration(config: ConfigurationEnv): Promise<boolean> {
        return new Promise((result, reject) => {
            try {
                const stingData = JSON.stringify(config)
                localStorage.setItem('configuration', stingData)
                result(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    getConfiguration(): Promise<{ success: boolean, env: ConfigurationEnv}> {
        return new Promise((result, reject) => {
            try {
                const confLocal = localStorage.getItem('configuration')
                if(confLocal){
                    const confJson: ConfigurationEnv =  JSON.parse(confLocal as string)
                    result({
                        success: true, 
                        env: confJson
                    })
                } else {
                    result({
                        success: false,
                        env: {} as ConfigurationEnv
                    })
                }
                
            } catch (error) {
                result({
                    success: false,
                    env: {} as ConfigurationEnv
                })
            }
        })
    }

    setModelsOpenai(models: ModelsOpenAI[]): Promise<boolean> {
        return new Promise((result, reject) => {
            try {
                const stingModels = JSON.stringify(models)
                localStorage.setItem('models_openai', stingModels)
                result(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    getModelsOpenai(): Promise<{ success: boolean, models: ModelsOpenAI[]}> {
        return new Promise((result, reject) => {
            try {
                const modelsLocal = localStorage.getItem('models_openai')
              
                if(modelsLocal){
                    const modelsArray: ModelsOpenAI[] =  JSON.parse(modelsLocal as string)
                    result({
                        success: true, 
                        models: modelsArray
                    })
                } else {
                    result({
                        success: false,
                        models: []
                    })
                }
            } catch (error) {
                result({
                    success: false,
                    models: []
                })
            }
        })
    }






  }