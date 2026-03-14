/**
 * Secure Error Handler - Converts Firebase errors to user-friendly messages
 * Never expose Firebase, error codes, or technical details to users
 */

export function getUserFriendlyError(error: any): string {
  // Handle Firebase auth errors
  if (error?.code) {
    const code = error.code;

    // Authentication errors
    if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
      return 'Invalid email or password. Please try again.';
    }
    if (code === 'auth/user-not-found') {
      return 'No account found with this email.';
    }
    if (code === 'auth/wrong-password') {
      return 'Incorrect password. Please try again.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'This email is already registered. Please sign in instead.';
    }
    if (code === 'auth/weak-password') {
      return 'Password is too weak. Please use a stronger password.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    if (code === 'auth/operation-not-allowed') {
      return 'This operation is not allowed. Please contact support.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many login attempts. Please try again later.';
    }
    if (code === 'auth/account-exists-with-different-credential') {
      return 'An account already exists with this email using a different sign-in method.';
    }
    if (code === 'auth/requires-recent-login') {
      return 'Please sign out and sign in again to complete this action.';
    }

    // Firestore errors
    if (code === 'permission-denied') {
      return 'You do not have permission to access this resource.';
    }
    if (code === 'not-found') {
      return 'The requested resource was not found.';
    }
    if (code === 'already-exists') {
      return 'This resource already exists.';
    }
    if (code === 'unauthenticated') {
      return 'Please sign in to continue.';
    }
    if (code === 'deadline-exceeded') {
      return 'Request took too long. Please try again.';
    }
  }

  // Handle network errors
  if (error?.message?.includes('Failed to fetch') || error?.message?.includes('Network')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Handle timeout errors
  if (error?.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  // Default fallback - never show the actual error
  return 'Something went wrong. Please try again later.';
}

/**
 * Log error to console in development, but never expose to user
 */
export function logError(context: string, error: any) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
  // In production, you could send to error tracking service (Sentry, etc)
}
