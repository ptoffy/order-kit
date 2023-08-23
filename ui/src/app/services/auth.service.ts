import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// Handles authentication logic
class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(username: string, password: string) {
        return this.httpClient.post<any>(`/api/login`, { username, password })
            .subscribe(res => {
                this.setSession(res);
            }
        );
        
    }

    private setSession(authResult: any) {
        const expiresAt = authResult.expiresIn + Date.now();

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        return Date.now() < this.getExpiration();
    }

    getExpiration(): number {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration || '{}');
        return expiresAt;
    }


}

export { AuthService };