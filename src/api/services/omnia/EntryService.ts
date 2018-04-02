import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { EventDispatcher, EventDispatcherInterface } from "../../../decorators/EventDispatcher";
import { Entry } from "../../models/omnia/Entry";
import { EntryRepository } from "../../repositories/omnia/EntryRepository";
import { events } from "../../subscribers/events";

@Service()
export class EntryService {
    constructor(
        @OrmRepository() private entryRepository: EntryRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) {

    }

    public find(): Promise<Entry[]> {
        return this.entryRepository.find();
    }

    public findOne(key: string): Promise<Entry | undefined> {
        return this.entryRepository.findOne({ key });
    }

    public async create(entry: Entry): Promise<Entry> {
        const newEntry = await this.entryRepository.save(entry);
        this.eventDispatcher.dispatch(events.omnia.entry.created, newEntry);
        return newEntry;
    }

    public update(key: string, entry: Entry): Promise<Entry> {
        entry.key = key;
        return this.entryRepository.save(entry);
    }

    public delete(key: string): Promise<void> {
        return this.entryRepository.delete({ key });
    }
}
