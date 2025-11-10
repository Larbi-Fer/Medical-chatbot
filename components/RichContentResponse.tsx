import { useMessage } from "@/store/useMessgae"

const RichContentResponse = ({ content }: { content: CustomResult[] }) => {
  return (
    content.map((msg, i) => (
      msg.message == 'text' ?
        <div key={i} className={`max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-gray-200 rise d${i} ${content.length > 2 ? 'first:rounded-b-[1px] last:rounded-t-[1px]' : ''}`}>
          {msg.text.text.map((t, i) => <div key={i}>{t}</div>)}
        </div> :
          msg.payload.fields.richContent ? 
            <div key={i} className={`bg-gray-800 rounded rise d${i} last:rounded-tl-[1px]`}>
              <CardContent values={msg.payload.fields.richContent.listValue.values[0].listValue.values} />
            </div>
          : null
          
    ))
  )
}

const CardContent = ({values}: {values: FieldsValue[]}) => {
  const image = values.find(v => v.structValue.fields.type.stringValue == 'image')
  if (image) return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div>
        <img
          src={image.structValue.fields.rawUrl.stringValue}
          alt={image.structValue.fields.accessibilityText.stringValue}
          className="rounded-2xl m-2 w-[95%]"
        />
      </div>
      <div>
        {values.map((value, i) => value.structValue.fields.type.stringValue == 'image' ? null : <FieldsToNode key={i} value={value} ord={i} />)}
      </div>
    </div>
  )
  return values.map((value, i) => <FieldsToNode key={i} value={value} ord={i} />)
}

const FieldsToNode = ({value, ord}: {value: FieldsValue, ord: number}) => {
  const {sendMessage} = useMessage()

  switch (value.structValue.fields.type.stringValue) {
    case 'image':
      return <div className={`m-2 rise d${ord}`}>
        <img
          src={value.structValue.fields.rawUrl.stringValue}
          alt={value.structValue.fields.accessibilityText.stringValue}
          className="rounded-2xl"
        />
      </div>
  
    case 'description':
      return <div className={`m-2 rise d${ord}`}>
        <div className="text-lg font-bold">{value.structValue.fields.title.stringValue}</div>
        {value.structValue.fields.text.listValue.values.map((text, i) => (
          <div key={i}>{text.stringValue}</div>
        ))}
      </div>

    case 'info':
      return <div className={`m-2 rise d${ord}`}>
        <div className="text-lg font-bold">{value.structValue.fields.title.stringValue}</div>
        <div>{value.structValue.fields.subtitle.stringValue}</div>
      </div>
    
    case 'divider':
      return <div className="w-full h-px bg-gray-500"></div>

    case 'chips':
      return value.structValue.fields.options.listValue.values.map((option, i) => (
        <button
          key={i}
          className="block px-4 py-1 cursor-pointer transition m-1 bg-blue-600 hover:bg-blue-700 rounded-full"
          onClick={e => {
            const parent = e.currentTarget.parentElement;
            if (parent) parent.style.display = "none";

            // Send a message
            sendMessage(e, option.structValue.fields.text.stringValue)
          }}
        >
          {option.structValue.fields.text.stringValue}
        </button>
      ))

    default:
      return
  }
}

export default RichContentResponse
