import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ModelsOpenAI, OpenAiModelsResponse, Training, TrainingCreate, TrainingResponse } from '../../interfaces/training.interface';
import { map, Observable, tap } from 'rxjs';
import { OpenAIModel } from '../../interfaces/openai.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //Training
  getTrainings(): Observable<Training[]>{
    return this.http.get<TrainingResponse>('/train/alls').pipe(map((res) => res.data as Training[]))
  }

  getOneTrain(id: string): Observable<Training>{
    return this.http.get<TrainingResponse>(`/train/one/${id}`).pipe(map((res) => res.data as Training))
  }

  createTrain(payload: TrainingCreate): Promise<Training>{
    return new Promise(async (result, reject) => {
      try {
        const headers = new Headers()
        const formData = new FormData()
        const apiUrl = localStorage.getItem('backend_url')

        headers.append("Accept", "*/*");

        formData.append('name', payload.name)
        formData.append('role_system', payload.role_system)
        formData.append('type_answer', payload.type_answer)
        formData.append('modelGeneratorData', payload.modelGeneratorData)
        formData.append('openAiKey', payload.openAiKey)

        payload.files.forEach(file => formData.append('files', file, file.name));
        
        const response = await fetch(`${apiUrl}/api/train/create`,
          { method: 'POST', body: formData, headers: headers });
        const data = await response.json();
        result(data)
        
      } catch (error) {
        console.log('error create Train FETCH = ', error);
      }
    })
  }

  updateTrain(payload: any): Observable<Training>{
    return this.http.put<TrainingResponse>(`/train/update`, payload).pipe(map((res) => res.data as Training))
  }

  _deleteOneTrain(id: string):Observable<boolean>{
    return this.http.delete<TrainingResponse>(`/train/delete/${id}`).pipe(map((res) => res.success))
  }

  //OpenAI
  getModelsOpenAIAvailable(apiKey: string): Observable<{ success: boolean, data: OpenAIModel[], message: string}>{
    return this.http.post<{ success: boolean, data: OpenAIModel[], message: string}>('/openai/get-models', {apiKey})
  }

  validateBackend(url: string): Observable<{ success: true, data: { message: string }}> {
    localStorage.setItem('backend_url', url)
    return this.http.get<{ success: true, data: { message: string }}>(`/server/validate`).pipe(map((res) => res))
  }
  
  // validatePostgres(url: string): Observable<{ message: string}>{
  //   return this.http.get<{ success: true, data: { message: string }}>('/validate/backend').pipe(map((res) => res.data))
  // }

  

}
