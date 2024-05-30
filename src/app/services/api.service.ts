import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelsOpenAI, OpenAiModelsResponse, Training, TrainingCreate, TrainingResponse } from '../interfaces/training.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  validateKeyOpenAI(apiKey: string):Observable<boolean>{
    return this.http.post<{success: boolean, is_valid: boolean}>('/openai/validate-key/', { apiKey: apiKey }).pipe(map((res) => res.is_valid))
  }

  //Training
  getTrainings(): Observable<Training[]>{
    return this.http.get<TrainingResponse>('/train/alls').pipe(map((res) => res.data as Training[]))
  }

  getOneTrain(id: string): Observable<Training>{
    return this.http.get<TrainingResponse>(`/train/one/${id}`).pipe(map((res) => res.data as Training))
  }

  createTrain(payload: TrainingCreate): Observable<Training>{
    return this.http.post<TrainingResponse>(`/train/create`, payload).pipe(map((res) => res.data as Training))
  }

  updateTrain(payload: any): Observable<Training>{
    return this.http.put<TrainingResponse>(`/train/update`, payload).pipe(map((res) => res.data as Training))
  }

  _deleteOneTrain(id: string):Observable<boolean>{
    return this.http.delete<TrainingResponse>(`/train/delete/${id}`).pipe(map((res) => res.success))
  }

  //OpenAI
  getModelsOpenAIAvailable(): Observable<ModelsOpenAI[]>{
    const tokenOpenAI = String(localStorage.getItem('openAI_token'))
    return this.http.post<OpenAiModelsResponse>('/openai/get-models', { apiKey: tokenOpenAI}).pipe(map(res => res.data))
  }

  

}
