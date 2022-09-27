export class StorageUtil {

    public static LocalStorageSave<T>(key: string, value: T): void{
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static SessionStorageSave<T>(key: string, value: T): void{
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static LocalStorageRead<T>(key:string): T | undefined  {
        const storedValue = localStorage.getItem(key)
        try {
            if(storedValue){
                return JSON.parse(storedValue)
            }
                return undefined;
        } catch (error) {
            localStorage.removeItem(key);
            return undefined;
        }
    
    }

    public static SessionStorageRead<T>(key:string): T | undefined  {
        const storedValue = sessionStorage.getItem(key)
        try {
            if(storedValue){
                return JSON.parse(storedValue)
            }
                return undefined;
        } catch (error) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    
    }


}