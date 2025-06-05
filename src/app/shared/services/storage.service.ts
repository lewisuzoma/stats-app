import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }
    getAllItems(): { [key: string]: any } {
        const items: { [key: string]: any } = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                items[key] = JSON.parse(localStorage.getItem(key) || '{}');
            }
        }
        return items;
    }
    hasItem(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }
    getKeys(): string[] {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                keys.push(key);
            }
        }
        return keys;
    }
    getLength(): number {
        return localStorage.length;
    }
    
}