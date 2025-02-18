declare global {
    interface Array<T> {
        rfind(callback: (item: T) => boolean): T | undefined;
    }
}

Array.prototype.rfind = function <T>(callback: (item: T) => boolean): T | undefined{
    let data = this.filter(callback)
    return data[data.length - 1]
}

export {}
