import type { UUID } from "crypto"

export const generateSessionId = () => crypto.randomUUID()

export const getStoredSessionId = (): UUID | null => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('sessionId') as UUID
    }
    return null
}

export const setStoreSessionId = (sessionId: UUID): void => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('sessionId', sessionId)
    }
}

export const clearStoredSessionId = (): void => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('sessionId')
    }
}

