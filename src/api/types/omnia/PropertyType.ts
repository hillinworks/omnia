import {
    GraphQLFieldConfigMap, GraphQLEnumType, GraphQLBoolean, GraphQLObjectType, GraphQLString
} from "graphql";

import { GraphQLContext, FromEnum } from "../../../lib/graphql";
import { PropertyOwnerType } from "./AspectType";
import { Property } from "../../models/omnia/Property";
import { DataTypes } from "../../../core/data/types/dataTypes";
import { Comparability } from "../../../core/data/Comparability";

const PropertyFields: GraphQLFieldConfigMap<any, any> = {
    namespace: {
        type: GraphQLString,
        description: "The namespace of this property",
    },
    key: {
        type: GraphQLString,
        description: "The key of the property.",
    },
    isObsolete: {
        type: GraphQLBoolean,
        description: "Whether this property is obsolete.",
    },
    name: {
        type: GraphQLString,
        description: "The name of the property.",
    },
    description: {
        type: GraphQLString,
        description: "Briefly describe this property.",
    },
    type: {
        type: new GraphQLEnumType({ name: "DataTypes", values: FromEnum(DataTypes) }),
        description: "The data type of property.",
    },
    metadata: {
        type: GraphQLString,
        description: "The json representation of the metadata of this property.",
    },
    comparability: {
        type: new GraphQLEnumType({ name: "Comparability", values: FromEnum(Comparability) }),
        description: "The comparability of property.",
    },
};

export const PropertyOfAspectType = new GraphQLObjectType({
    name: "PropertyOfAspect",
    description: "An aspect's property",
    fields: () => ({ ...PropertyFields }),
});

export const PropertyType = new GraphQLObjectType({
    name: "Property",
    description: "A single property.",
    fields: () => ({
        ...PropertyFields, ...{
            aspect: {
                type: PropertyOwnerType,
                description: "The aspect of the property",
                resolve: (property: Property, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.aspect.load(property.key),
            },
        },
    }),
});
