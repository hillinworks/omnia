import { EntityRepository, Repository } from "typeorm";

import { Entry } from "../../models/omnia/Entry";

@EntityRepository(Entry)
export class EntryRepository extends Repository<Entry> {

}
