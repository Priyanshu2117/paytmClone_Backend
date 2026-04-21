
export const generateZodMessage = (message)=>{
    const messages = message.map((item)=>{
        return item.path[0] + ": " +item.message
    })

    return messages;
}