interface Message {
    intent: string
    reply: string
    result: CustomResult[]
}

type CustomResult = {
    message: 'text'
    text: {
        text: string[]
    }
} | {
    message: 'payload',
    payload: {
        fields: {
            richContent: {
                listValue: {
                    values: {
                        listValues: { values: FieldsValue[] }
                    }[]
                }
            }
        }
    }
}

type FieldsValue = {
    type: { stringValue: 'image' }
    rawUrl: { stringValue: string }
    accessibilityText: { stringValue: string }
} | {
    type: { stringValue: 'info' }
    title: { stringValue: string }
    subtitle: { stringValue: string }
} | {
    type: { stringValue: 'divider' }
} | {
    type: { stringValue: 'description' }
    title: { stringValue: string }
    text: { listValue: {values: {stringValue: string}[]} }
}