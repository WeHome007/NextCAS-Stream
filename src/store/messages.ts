import { defineStore } from 'pinia'

export interface MessageType {
  content: string
  reqId?: string
  from: 'user' | 'nexthuman'
}

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      messages: [],
    } as {
      messages: MessageType[]
    }
  },

  actions: {
    sendMessage(text: string, reqId?: string) {
      this.messages.push({
        content: text,
        from: 'user',
        reqId,
      })
    },
    onReply(text: string, reqId: string) {
      const index = this.messages.findIndex(item => item.reqId === reqId && item.from === 'nexthuman')
      if (index === -1) {
        this.messages.push({
          content: text,
          from: 'nexthuman',
          reqId,
        })
      }
      else {
        this.messages[index].content += text
      }
    },
  },
})
