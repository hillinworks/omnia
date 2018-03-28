import { EntityRepository, Repository } from "typeorm";

import { Aspect } from "../../models/omnia/Aspect";

@EntityRepository(Aspect)
export class AspectRepository extends Repository<Aspect> {

}
