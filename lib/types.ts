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
                        listValue: { values: FieldsValue[] }
                    }[]
                }
            }
        }
    }
}

interface FieldsValue {
    structValue: {
        fields: Values
    }
}

type Values = {
    type: { stringValue: 'image' | 'info' | 'divider' |  'description' | 'chips' }

    // image
    rawUrl: { stringValue: string }
    accessibilityText: { stringValue: string }

    // info & description
    title: { stringValue: string }
    // info
    subtitle: { stringValue: string }

    // description
    text: { listValue: {values: {stringValue: string}[]} }

    // chips
    options: {
        listValue: {
            values: {
                structValue: {
                    fields: {text: {stringValue: string}}
                }
            }[]
        }
    }
}