import { EntityRepository, Repository } from "typeorm";

import { Enumeration } from "../../models/omnia/Enumeration";

@EntityRepository(Enumeration)
export class EnumerationRepository extends Repository<Enumeration> {

}
