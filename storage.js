// Polyfill for window.storage (Claude.ai API) using localStorage
// Injected at app startup so the app code doesn't need to change

window.storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key)
      if (value === null) throw new Error('Key not found')
      return { key, value, shared: false }
    } catch (e) {
      throw e
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value)
      return { key, value, shared: false }
    } catch (e) {
      throw e
    }
  },
  async delete(key) {
    localStorage.removeItem(key)
    return { key, deleted: true, shared: false }
  },
  async list(prefix = '') {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix))
    return { keys, prefix, shared: false }
  }
}
