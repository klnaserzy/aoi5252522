<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import type { Message } from '@/utils/chatApi'

const base = import.meta.env.BASE_URL
const avatarImg = `${base}chickensKnowAOIIsHungry.png`

const messages = computed<Message[]>(() => {
  return [
    {
      id: '1',
      author: 'aoi 5252522',
      content: 'hungry',
      time: '2026-05-30 17:57',
      isHidden: false,
    },
    {
      id: '2',
      author: '',
      content: '測試 測試 馬鈴薯',
      isHidden: false,
      time: '2026-06-04 17:39',
    },
    {
      id: '3',
      author: 'Kalin風凜魂太',
      content: '我路過，酷欸',
      isHidden: false,
      time: '2026-06-05 20:23',
    },
    {
      id: '4',
      author: '',
      content: '👍這個就是看到虎牙網站有個聊天室做的',
      isHidden: false,
      time: '2026-06-06 16:27',
    },
  ]
})

const authorName = ref('')
const inputText = ref('')
const messageListRef = ref<HTMLElement | null>(null)
const isSending = ref(false)

// const revealedIds = ref<Set<string>>(new Set())
// const hideLoading = ref<string | null>(null)
// const unhideLoading = ref<string | null>(null)

// const reveal = (id: string) => {
//   revealedIds.value = new Set([...revealedIds.value, id])
// }

// const hide = async (msg: Message) => {
//   if (!msg.id) return
//   hideLoading.value = msg.id
//   try {
//     await updateChatRecord(msg.id, { ...msg, isHidden: true })
//     await chatStore.fetchChatData()
//   } catch (error) {
//     console.error(error)
//   } finally {
//     hideLoading.value = null
//   }
// }

// const unhide = async (msg: Message) => {
//   if (!msg.id) return
//   unhideLoading.value = msg.id
//   try {
//     await updateChatRecord(msg.id, { ...msg, isHidden: false })
//     await chatStore.fetchChatData()
//     revealedIds.value.delete(msg.id)
//   } catch (error) {
//     console.error(error)
//   } finally {
//     unhideLoading.value = null
//   }
// }

const scrollToBottom = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight
  }
}

// const getTime = () => {
//   const now = new Date()
//   return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
// }

// const sendMessage = async () => {
//   const text = inputText.value.trim()
//   if (!text || isSending.value) return

//   isSending.value = true
//   inputText.value = ''

//   try {
//     const message: Message = {
//       author: authorName.value,
//       content: text,
//       isHidden: false,
//       time: getTime(),
//     }

//     await createChatRecord(message)
//     chatStore.fetchChatData()
//   } catch (error) {
//     console.error(error)
//   }

//   await scrollToBottom()
//   isSending.value = false
// }

// const handleKeydown = (e: KeyboardEvent) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault()
//     sendMessage()
//   }
// }

onMounted(async () => {
  await scrollToBottom()
})
</script>

<template>
  <div class="chat-container">
    <!-- 頁面標題 -->
    <div class="chat-header">
      <div class="header-left">
        <span class="channel-icon">💬</span>
        <div>
          <h1>診所留言板</h1>
          <p class="header-desc">與其他病患交流對《蝕／光》的感受</p>
        </div>
      </div>
      <div class="online-badge">
        <span class="dot" />
        {{ messages ? messages.length : '0' }} 則留言
      </div>
    </div>

    <!-- 聊天主體 -->
    <div class="chat-body">
      <!-- 訊息列表 -->
      <div ref="messageListRef" class="message-list">
        <div v-for="msg in messages" :key="msg.id" class="message-row">
          <img :src="avatarImg" class="avatar" alt="" />
          <div class="bubble-wrap">
            <div class="bubble-group">
              <div class="msg-meta">
                <span class="msg-author">{{ msg.author }}</span>
                <span class="msg-time">{{ msg.time }}</span>
              </div>
              <div class="bubble">{{ msg.content }}</div>
            </div>
            <!-- 隱藏遮罩 -->
            <!-- <div v-if="msg.isHidden && !revealedIds.has(msg.id ?? '')" class="hidden-mask">
              <p class="mask-label">此訊息已隱藏</p>
              <div class="mask-actions">
                <button class="mask-btn reveal-btn" @click="reveal(msg.id ?? '')">
                  查看隱藏內容
                </button>
                <button
                  class="mask-btn unhide-btn"
                  :disabled="unhideLoading === msg.id"
                  @click="unhide(msg)"
                >
                  {{ unhideLoading === msg.id ? '處理中...' : '取消隱藏' }}
                </button>
              </div>
            </div> -->
          </div>
          <!-- 隱藏按鈕 -->
          <!-- <div v-if="!msg.isHidden" class="hide-bar">
            <button class="hide-btn" :disabled="hideLoading === msg.id" @click="hide(msg)">
              {{ hideLoading === msg.id ? '...' : '隱藏' }}
            </button>
          </div> -->
        </div>
      </div>

      <!-- 輸入區 -->
      <div class="input-area">
        <div class="input-name-row">
          <span class="name-label">署名</span>
          <input
            v-model="authorName"
            class="name-input"
            placeholder="訪客（可自行填入）"
            maxlength="20"
          />
        </div>
        <div class="input-row">
          <textarea
            v-model="inputText"
            :disabled="true"
            class="chat-input"
            placeholder="輸入留言... (Enter 送出，Shift+Enter 換行)"
            rows="1"
          />
          <button class="send-btn" :disabled="true">
            <span v-if="isSending" class="btn-spinner" />
            <span v-else>↑</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
}

/* 頂部標題列 */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.channel-icon {
  font-size: 1.6rem;
  line-height: 1;
}
.chat-header h1 {
  margin: 0;
  font-size: 1.2rem;
  color: #f8fafc;
}
.header-desc {
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.online-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
}

/* 聊天主體 */
.chat-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #0d0d14;
  border: 1px solid var(--border-color);
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

/* 訊息列表 */
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  scrollbar-width: thin;
  scrollbar-color: #2a2a35 transparent;
}
.message-list::-webkit-scrollbar {
  width: 4px;
}
.message-list::-webkit-scrollbar-thumb {
  background: #2a2a35;
  border-radius: 2px;
}

/* 單則訊息 */
.message-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #1a1a2e;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.bubble-wrap {
  position: relative;
  max-width: 68%;
  flex: 1;
}
.bubble-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.hide-bar {
  margin-left: auto;
  align-self: flex-start;
  padding-top: 0.2rem;
}
.hide-btn {
  background: transparent;
  border: none;
  color: #4b5563;
  font-size: 0.72rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: color 0.2s;
  white-space: nowrap;
}
.hide-btn:hover:not(:disabled) {
  color: #ff5e7e;
}
.hide-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.hidden-mask {
  position: absolute;
  inset: 0;
  background: rgba(13, 13, 20, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 4px 12px 12px 12px;
  padding: 0.75rem 1rem;
  text-align: center;
}
.mask-label {
  color: #94a3b8;
  font-size: 0.8rem;
  margin: 0;
}
.mask-actions {
  display: flex;
  gap: 0.5rem;
}
.mask-btn {
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s;
}
.mask-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.reveal-btn {
  background: rgba(255, 94, 126, 0.15);
  border-color: rgba(255, 94, 126, 0.4);
  color: #ff5e7e;
}
.reveal-btn:hover:not(:disabled) {
  background: rgba(255, 94, 126, 0.28);
}
.unhide-btn {
  background: rgba(100, 116, 139, 0.15);
  border-color: rgba(100, 116, 139, 0.4);
  color: #94a3b8;
}
.unhide-btn:hover:not(:disabled) {
  background: rgba(100, 116, 139, 0.28);
}

.msg-meta {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  padding-left: 0.1rem;
}
.msg-author {
  font-size: 0.82rem;
  font-weight: 600;
  color: #f8fafc;
}
.msg-handle {
  font-size: 0.72rem;
  color: var(--text-muted);
}
.msg-time {
  font-size: 0.68rem;
  color: #4b5563;
}

.bubble {
  background: #1a1a2e;
  border: 1px solid var(--border-color);
  border-radius: 4px 12px 12px 12px;
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.55;
  word-break: break-word;
}

/* 輸入區 */
.input-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem 1rem;
  border-top: 1px solid var(--border-color);
  background: #0d0d14;
}
.input-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.name-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}
.name-input {
  width: 160px;
  background: #1a1a2e;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.3rem 0.65rem;
  color: #f8fafc;
  font-size: 0.82rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.name-input:focus {
  border-color: rgba(255, 77, 109, 0.5);
}
.name-input::placeholder {
  color: #4b5563;
}
.input-row {
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
}
.chat-input {
  flex: 1;
  background: #1a1a2e;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0.65rem 1rem;
  color: #f8fafc;
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  outline: none;
  line-height: 1.5;
  transition: border-color 0.2s;
  max-height: 120px;
  overflow-y: auto;
}
.chat-input:focus {
  border-color: rgba(255, 77, 109, 0.5);
}
.chat-input::placeholder {
  color: #4b5563;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-color);
  border: none;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.2s,
    opacity 0.2s;
}
.send-btn:hover:not(:disabled) {
  background: var(--accent-color);
}
.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .chat-container {
    height: calc(100vh - 80px);
  }
  .bubble-group {
    max-width: 82%;
  }
}
</style>
