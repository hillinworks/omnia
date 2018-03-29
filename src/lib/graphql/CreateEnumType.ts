import { GraphQLEnumValueConfigMap } from "graphql";

interface ObjectLiteral {
    [key: string]: any;
}

export function FromEnum(enumType: object): GraphQLEnumValueConfigMap {
    const map: GraphQLEnumValueConfigMap = {};
    const enumLiteral = enumType as ObjectLiteral;
    for (const key of Object.keys(enumType)) {
        map[key] = {
            value: enumLiteral[key],
        };
    }
    return map;
}
