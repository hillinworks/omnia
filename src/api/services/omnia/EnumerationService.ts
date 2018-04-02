import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { EventDispatcher, EventDispatcherInterface } from "../../../decorators/EventDispatcher";
import { Enumeration } from "../../models/omnia/Enumeration";
import { EnumerationRepository } from "../../repositories/omnia/EnumerationRepository";
import { events } from "../../subscribers/events";

@Service()
export class EnumerationService {
    constructor(
        @OrmRepository() private enumerationRepository: EnumerationRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {

    }

    public find(): Promise<Enumeration[]> {
        return this.enumerationRepository.find();
    }

    public findOne(key: string): Promise<Enumeration | undefined> {
        return this.enumerationRepository.findOne({ key });
    }

    public async create(enumeration: Enumeration): Promise<Enumeration> {
        const newEnumeration = await this.enumerationRepository.save(enumeration);
        this.eventDispatcher.dispatch(events.omnia.enumeration.created, newEnumeration);
        return newEnumeration;
    }

    public update(key: string, entry: Enumeration): Promise<Enumeration> {
        entry.key = key;
        return this.enumerationRepository.save(entry);
    }

    public delete(key: string): Promise<void> {
        return this.enumerationRepository.delete({ key });
    }
}
