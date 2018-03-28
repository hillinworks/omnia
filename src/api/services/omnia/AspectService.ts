import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { EventDispatcher, EventDispatcherInterface } from "../../../decorators/EventDispatcher";
import { L } from "../../../lib/linqlite";
import { Aspect } from "../../models/omnia/Aspect";
import { AspectRepository } from "../../repositories/omnia/AspectRepository";
import { PropertyRepository } from "../../repositories/omnia/PropertyRepository";
import { events } from "../../subscribers/events";

@Service()
export class AspectService {
    constructor(
        @OrmRepository() private aspectRepository: AspectRepository,
        @OrmRepository() private propertyRepository: PropertyRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {

    }

    public find(): Promise<Aspect[]> {
        return this.aspectRepository.find();
    }

    public findOne(namespace: string, key: string): Promise<Aspect | undefined> {
        return this.aspectRepository.findOne({ namespace, key });
    }

    public async create(aspect: Aspect): Promise<Aspect> {
        this.updatePropertyNamespaces(aspect);
        const newAspect = await this.aspectRepository.save(aspect);
        this.eventDispatcher.dispatch(events.omnia.aspect.created, newAspect);
        return newAspect;
    }

    public async update(namespace: string, key: string, aspect: Aspect): Promise<Aspect> {
        aspect.namespace = namespace;
        aspect.key = key;

        if (aspect.properties) {
            // mark non-existed properties as obsolete
            const oldProperties = await this.propertyRepository.find({ namespace: aspect.fullKey });
            const obsoleteProperties = L(oldProperties).exceptKey(aspect.properties, p => p.key).toArray();
            for (const obsoleteProperty of obsoleteProperties) {
                obsoleteProperty.isObsolete = true;
            }
            await this.aspectRepository.save(obsoleteProperties);
        }

        this.updatePropertyNamespaces(aspect);

        return await this.aspectRepository.save(aspect);
    }

    public delete(namespace: string, key: string): Promise<void> {
        return this.aspectRepository.delete({ namespace, key });
    }

    private updatePropertyNamespaces(aspect: Aspect): void {
        if (aspect.properties) {
            for (const property of aspect.properties) {
                property.namespace = aspect.fullKey;
            }
        }
    }
}
