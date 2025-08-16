import { supabase } from "@/components/client/SuperbasClient";


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
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        if (callback) () => { callback(false, error.message); }
    }
    else {
        const msg = 'Check your email for the password reset link.'
        if (callback) () => { callback(true, msg); }
    }
}

export const handleResetPassword = async (password, callback) => {

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        if (callback) callback(false, error.message);
    }
    else {
        const msg = 'Password updated! Redirecting to sign in...';
        if (callback) () => { callback(true, msg); }
    }
};

export const fetchLoggedInUserDetails = async (callback) => {
    const { data: { session }, error, } = await supabase.auth.getSession();

    if (error) {
        console.error('Error fetching session:', error.message);
        if (callback) callback(false, error.message);
    } else {
        //console.log('User:', session?.user);
        //console.log('Access Token:', session?.access_token);
        if (callback) callback(true, session);
    }

};


export const handleSignOut = async (callback) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        let msg = "Error signing out."
        if (callback) callback(true, msg);
    } else {
        let msg = "Signed Out"
        if (callback) callback(true, msg);
    }
};