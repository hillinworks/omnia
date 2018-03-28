import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from "routing-controllers";

import { ICompositeKey } from "../../../core/CompositeKey";
import { AspectNotFoundError } from "../../errors/omnia/AspectNotFoundError";
import { Aspect } from "../../models/omnia/Aspect";
import { AspectService } from "../../services/omnia/AspectService";

@JsonController("/omnia/aspect")
export class AspectController {
    constructor(
        private aspectService: AspectService
    ) { }

    @Get()
    public find(): Promise<Aspect[]> {
        return this.aspectService.find();
    }

    @Get("/:fullKey")
    @OnUndefined(AspectNotFoundError)
    public findOne(@Param("fullKey") fullKey: string): Promise<Aspect | undefined> {
        return this.aspectService.findOne(ICompositeKey.parse(fullKey));
    }

    @Post()
    public create(@Body() aspect: Aspect): Promise<Aspect> {
        return this.aspectService.create(aspect);
    }

    @Put("/:fullKey")
    public update(@Param("fullKey") fullKey: string, @Body() aspect: Aspect): Promise<Aspect> {
        return this.aspectService.update(ICompositeKey.parse(fullKey), aspect);
    }

    @Delete("/:fullKey")
    public delete(@Param("fullKey") fullKey: string): Promise<void> {
        return this.aspectService.delete(ICompositeKey.parse(fullKey));
    }
}
