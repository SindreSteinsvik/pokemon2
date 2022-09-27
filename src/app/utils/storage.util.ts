export class StorageUtil {

    public static storageSave<T>(key: string, value: T): void{
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key:string): T | undefined  {
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
}