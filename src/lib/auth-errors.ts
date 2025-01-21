export enum AuthErrorType {
  INVALID_USER_TYPE = 'INVALID_USER_TYPE',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
  details?: string;
}

export function createAuthError(
  type: AuthErrorType, 
  message?: string, 
  details?: string
): AuthError {
  const defaultMessages = {
    [AuthErrorType.INVALID_USER_TYPE]: 'Please select a valid user type.',
    [AuthErrorType.AUTHENTICATION_FAILED]: 'Authentication failed. Please try again.',
    [AuthErrorType.NETWORK_ERROR]: 'Network error. Please check your connection.',
    [AuthErrorType.UNAUTHORIZED]: 'You are not authorized to access this resource.',
    [AuthErrorType.UNKNOWN_ERROR]: 'An unexpected error occurred.'
  }

  return {
    type,
    message: message || defaultMessages[type],
    details
  }
}

export function handleAuthError(error: any): AuthError {
  if (error instanceof Error) {
    // Clerk-specific error handling
    if (error.name === 'ClerkError') {
      return createAuthError(
        AuthErrorType.AUTHENTICATION_FAILED, 
        error.message
      )
    }

    // Network error handling
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return createAuthError(
        AuthErrorType.NETWORK_ERROR,
        'Unable to connect to authentication service.'
      )
    }
  }

  // Fallback to unknown error
  return createAuthError(
    AuthErrorType.UNKNOWN_ERROR, 
    'An unexpected error occurred during authentication.'
  )
}
