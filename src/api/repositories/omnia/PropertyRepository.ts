import { EntityRepository, Repository } from "typeorm";

import { Property } from "../../models/omnia/Property";

@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
    public findByAspectKeys(keys: string[]): Promise<Property[]> {

        return this.createQueryBuilder()
            .select()
            .where(`property.aspectKey IN (${keys.map(key => `'${key}'`).join(", ")})`)
            .getMany();
    }
}
