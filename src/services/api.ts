const API_URL = "https://script.google.com/macros/s/AKfycbwsIZNe1zyVsBkSb836iDh7D0v-EpZUszU_ARyr9jJqCDJqsCLDwVkfRzwEn2NHCrdRxw/exec";

// ── Module-level in-flight lock ───────────────────────────────────────────────
// A second defensive layer: if two calls somehow reach this function at the
// same time (e.g. rapid UI interaction), only the first goes through.
// The lock is automatically released when the request settles.
let _submissionInFlight = false;

export async function submitSurvey(data: any) {
    if (_submissionInFlight) {
        console.warn('[api] submitSurvey blocked — a submission is already in flight.');
        throw new Error('A submission is already in progress.');
    }

    _submissionInFlight = true;
    console.log('[api] Submitting payload:', data);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('[api] Survey submission error:', error);
        throw error;
    } finally {
        // Always release the lock, even on network error
        _submissionInFlight = false;
    }
}