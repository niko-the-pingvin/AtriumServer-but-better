initSettings();

async function initSettings(){
    const request = await fetch('/api/admin/auth/session');
    if(!request.ok) window.location.replace('/admin/login');

    const response = await request.json();
    localStorage.setItem('authTokenAd', response.accessToken);
    window.location.replace('/admin/accounts');
}