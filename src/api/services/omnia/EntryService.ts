import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { EventDispatcher, EventDispatcherInterface } from "../../../decorators/EventDispatcher";
import { Entry } from "../../models/omnia/Entry";
import { EntryRepository } from "../../repositories/omnia/EntryRepository";
import { events } from "../../subscribers/events";

@Service()
export class EntryService {
    constructor(
        @OrmRepository() private aspectRepository: EntryRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {

    }

    public find(): Promise<Entry[]> {
        return this.aspectRepository.find();
    }

    public findOne(namespace: string, key: string): Promise<Entry | undefined> {
        return this.aspectRepository.findOne({ namespace, key });
    }

    public async create(aspect: Entry): Promise<Entry> {
        const newEntry = await this.aspectRepository.save(aspect);
        this.eventDispatcher.dispatch(events.omnia.aspect.created, newEntry);
        return newEntry;
    }

    public update(namespace: string, key: string, aspect: Entry): Promise<Entry> {
        aspect.namespace = namespace;
        aspect.key = key;
        return this.aspectRepository.save(aspect);
    }

    public delete(namespace: string, key: string): Promise<void> {
        return this.aspectRepository.delete({ namespace, key });
    }
}
