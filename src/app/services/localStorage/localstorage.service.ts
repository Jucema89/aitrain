import { Injectable } from "@angular/core";
import { ConfigurationEnv } from "../../interfaces/training.interface";

@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageService {

    setConfiguration(config: ConfigurationEnv): Promise<boolean> {
        console.log('conf service = ', config)
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
                const confJson: ConfigurationEnv =  JSON.parse(confLocal as string)
                result({
                    success: true, 
                    env: confJson
                })
            } catch (error) {
                result({
                    success: false,
                    env: {} as ConfigurationEnv
                })
            }
        })
    }






  }