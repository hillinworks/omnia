export interface ICompositeKey {
    namespace: string;
    key: string;
}

export namespace ICompositeKey {
    export function parse(fullKey: string): ICompositeKey {
        const lastDotIndex = fullKey.lastIndexOf(".");
        if (lastDotIndex < 0) {
            return { namespace: undefined, key: fullKey };
        }

        return {
            namespace: fullKey.substr(0, lastDotIndex),
            key: fullKey.substr(lastDotIndex + 1),
        };
    }

    export function toString(key: ICompositeKey): string {
        if (key.namespace && key.namespace.length > 0) {
            return `${key.namespace}.${key.key}`;
        }

        return key.key;
    }
}
