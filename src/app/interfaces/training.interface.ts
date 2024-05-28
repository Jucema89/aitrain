export interface Training {
    id: string       
    files: FileTraining[]
    name :string
    description :string           
    modelGeneratorData :string          
    DB_VectorName :string
    createdAt :string             
    updatedAt :string  
}

export type TrainingCreate = Omit<Training, 'id'  | 'createdAt' | 'updatedAt'>;

export interface FileTraining {
    id :string                
    registerId :string
    fieldName :string
    type: 'excel' | 'application' | 'pdf' | 'word' | 'image' | 'video' | 'audio' | 'presentation' | 'other'
    name :string
    link :string
    createdAt :string             
    updatedAt :string   
}

export interface TrainingResponse {
    success: boolean
    data: Training | Training[]
    message?: string
}