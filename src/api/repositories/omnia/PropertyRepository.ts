import { EntityRepository, Repository } from "typeorm";

import { Property } from "../../models/omnia/Property";

@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {

}
