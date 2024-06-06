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

export interface OpenAiModelsResponse {
    success: boolean
    data: ModelsOpenAI[]
    message?: string
}

export interface ModelsOpenAI {
    id: string
    object: string
    created: number
    owned_by: string
}

export interface ConfigurationEnv {
    openAiKey: string
    postgresUrl: string
    qdrantUrl: string
    useAws: boolean
    useVectorDatabase: boolean
    awsKeyId: string
    awsAccessKey: string
    awsBucket: string
    awsRegion: string
}