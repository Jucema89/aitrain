export interface OpenAIModel {
    id: string //name model
    object: string
    created: number
    owned_by: string
}

export interface OpenAICreateFientuning {
    apiKey: string
    idDoc: string
    model: string
    name: string
}

export interface OpenaiFinetuningCreated {
    object: string
    id: string
    model: string
    created_at: number
    fine_tuned_model: string | null
    organization_id: string
    result_files: any[]
    status: string
    validation_file: string
    training_file: string
}

export interface OpenaiFinetuningResponse {
    success: boolean
    data: OpenaiFinetuningCreated
    message?: string
}

export interface OpenaiFinetuningListResponse {
    success: boolean
    data: OpenAiFinetuned[]
    message?: string
}


export interface OpenAiFinetuned {
    object: string
    id: string
    model: string //model origin 
    created_at: number
    finished_at: number
    fine_tuned_model: string //name model
    organization_id: string
    result_files: string[],
    status: FinetunedStatus
    validation_file: null,
    training_file: string,
    hyperparameters: {
        n_epochs: number
        batch_size: number
        learning_rate_multiplier: number
    },
    trained_tokens: number
    user_provided_suffix: string
    integrations: any[],
    seed: number
    estimated_finish: number
  }

  export type FinetunedStatus = 'validating_files' | 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled'
