import { supabase } from "@/components/client/SuperbasClient";
import { RESET_PASSWORD_URL } from "@/components/common/constants/AppRouterConstant";

const supabaseUrl = import.meta.env.VITE_SUPABASE_EDGE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const handleSignin = async (email, password, callback) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        const msg = error.message || 'Sign-in failed.';
        if (callback) { callback(false, msg); }
    } else {
        const msg = 'Logged in!';
        if (callback) { callback(true, msg); }
    }
}


export const handleSignup = async (email, password, callback) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
        if (callback) { callback(false, error.message); }
    }
    else {
        const msg = 'Check your email for confirmation link.'
        if (callback) { callback(true, msg) }
    }
}


export const handleForgotPassword = async (email, callback) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${RESET_PASSWORD_URL}`,
    });

    if (error) {
        if (callback) { callback(false, error.message); }

    } else {
        const msg = 'Check your email for the password reset link.'
        if (callback) { callback(true, msg) }
    }
}



export const fetchLoggedInUserDetails = async (callback) => {
    const { data: { session }, error, } = await supabase.auth.getSession();

    if (error) {
        console.error('Error fetching session:', error.message);
        if (callback) callback(false, error.message);
    } else {

        if (callback) callback(true, session);
    }

};


export const handleSignOut = async (callback) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        let msg = "Error signing out."
        if (callback) callback(false, msg);
    } else {
        let msg = "Signed Out"
        if (callback) callback(true, msg);
    }
};

export const handleResetPassword = async (data, callback) => {
    const { password, token, email } = data;


    const authUrl = replaceFunctionWithAuth(supabaseUrl);
    const redirectUrl = `${window.location.origin}${RESET_PASSWORD_URL}?token=${token}`; // Your reset password route, e.g., '/reset-password'


    try {
        // Step 1: Verify the reset token to get a valid JWT
        const verifyResponse = await fetch(`${authUrl}verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
            },
            body: JSON.stringify({
                email, // Include the user's email
                token: token,
                type: 'recovery',
            }),
        });

        if (!verifyResponse.ok) {
            const errorData = await verifyResponse.json();
            throw new Error(errorData.message || 'Failed to verify reset token');
        }

        const { access_token } = await verifyResponse.json();

        // Step 2: Update the password with the JWT
        const updateResponse = await fetch(`${authUrl}user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'apikey': supabaseKey,
            },
            body: JSON.stringify({
                password,
                email_redirect_to: `${redirectUrl}`,
            }),
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.error_description || 'Failed to update password');
        }

        const msg = 'Password updated! Redirecting to sign in...';
        if (callback) callback(true, msg);
    } catch (error) {
        if (callback) callback(false, error.message);
    }
};

function replaceFunctionWithAuth(url) {
    // Define the pattern to match
    const functionPattern = /\/functions\/v1\//;
    // Replace with auth path
    return url.replace(functionPattern, '/auth/v1/');
}